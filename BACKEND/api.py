from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import nltk
import os
import google.generativeai as genai
from dotenv import load_dotenv
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from pathlib import Path

# Initialize the Flask application
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# --- Gemini API Configuration ---
env_path = Path(__file__).parent / '.env'

print("\n" + "="*50)
print(f"📂 Loading .env from: {env_path.resolve()}")

if env_path.exists():
    print("✅ Found .env file!")
    load_dotenv(dotenv_path=env_path, override=True)
else:
    print("❌ .env file NOT found! Please check file name and location.")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("❌ ERROR: GEMINI_API_KEY is None. Check your .env content.")
    gemini_model = None
else:
    GEMINI_API_KEY = GEMINI_API_KEY.strip()
    
    masked_key = f"{GEMINI_API_KEY[:5]}...{GEMINI_API_KEY[-4:]}"
    print(f"🔑 Loaded Key: {masked_key}")
    print(f"📏 Key Length: {len(GEMINI_API_KEY)} characters")

    try:
        genai.configure(api_key=GEMINI_API_KEY)
        
        gemini_model = genai.GenerativeModel('gemini-2.5-flash-lite')
        
        print("✅ Gemini API Configured Successfully")
    except Exception as e:
        print(f"❌ Error configuring Gemini: {e}")
        gemini_model = None

print("="*50 + "\n")

# --- load NLTK ---
nltk.download('stopwords')
nltk.download('wordnet')
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# --- load model ---
try:
    model = joblib.load('TF-IDF and SVM/movie_genre_multilabel_svm.pkl')
    tfidf = joblib.load('TF-IDF and SVM/tfidf_vectorizer.pkl')
    mlb = joblib.load('TF-IDF and SVM/genre_binarizer.pkl') 
    print("✅ Multi-Label Model, Vectorizer, and Binarizer loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    model = None
    tfidf = None
    mlb = None

# --- Core function: text cleaning ---
def clean_text(text):
    if not text: return ""
    
    # 1. 移除特殊字符
    text = re.sub(r'[^a-zA-Z]', ' ', str(text))
    # 2. 转小写
    text = text.lower()
    # 3. 分词 + Lemmatization + 去停用词 + 长度过滤
    words = text.split()
    words = [
        lemmatizer.lemmatize(w)
        for w in words
        if w not in stop_words and len(w) > 2
    ]
    return " ".join(words)

# --- API Interface 1: Movie Classification Prediction (Updated) ---
@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get('text', '')
    
    if not model or not tfidf or not mlb:
        return jsonify({'error': 'Models not loaded correctly on server.'}), 500
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        # 1. 清洗文本
        cleaned_input = clean_text(text)
        
        # 2. 向量化
        input_vector = tfidf.transform([cleaned_input])
        
        # 3. 预测 (返回二进制矩阵)
        prediction_binary = model.predict(input_vector)
        
        # 4. 转回标签名称 (例如 [('Action', 'Thriller')])
        predicted_labels = mlb.inverse_transform(prediction_binary)
        
        # 5. 处理结果
        if predicted_labels and len(predicted_labels[0]) > 0:
            # 将列表转换为逗号分隔的字符串: "Action, Thriller"
            final_genre_string = ", ".join(predicted_labels[0])
        else:
            # 如果没预测出任何结果，返回默认值
            final_genre_string = "Drama" 

        return jsonify({'genre': final_genre_string}) 
        
    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({'error': str(e)}), 500

# --- API Interface 2: Chatbot (Gemini) ---
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not GEMINI_API_KEY or not gemini_model:
        return jsonify({'response': "Error: Gemini API Key missing or model failed to load. Please check server logs."}), 500

    system_context = """
    You are the official AI Assistant for 'Cinematch AI', a web portal developed by Group DEY (Ding Jia Jun, Eldhon Chong Qi Jie, Tan Yi Xin) for a Year 3 NLP project.

    Your goal is to assist users by answering questions about the project, explaining the technology, and guiding them to specific pages.

    --- KNOWLEDGE BASE (Source of Truth) ---
    1. PROJECT & TEAM:
       - Developer: Group DEY (Ding Jia Jun, Eldhon Chong Qi Jie, Tan Yi Xin).
       - Goal: An NLP-based system that automatically predicts movie genres from plot summaries.
    2. TECH STACK (from About Page - Tab 1):
       - Frontend: React, Tailwind CSS.
       - Backend: Flask, Python.
       - ML Model: Linear Support Vector Machine (SVM).
       - NLP Libraries: TF-IDF Vectorization, NLTK (Porter Stemming, Stopword removal), Scikit-Learn.
    3. KEY STATISTICS (from Home Page):
       - Dataset: Kaggle Movies Dataset (9000+ movies).
       - Speed: Predictions in <3s.
       - Accuracy: ~40% (Reflects the subjective/complex nature of genres).
       - Categories: Supports 15+ Genre Categories.
    4. CLASSIFICATION PROCESS (from Classify Page):
       - Step 1: Input (User pastes synopsis, 100-500 chars recommended).
       - Step 2: Processing (Tokenization -> Feature Extraction).
       - Step 3: Classification (SVM Model predicts genre).
    5. UI FEATURES:
       - Navigation Bar: Top of screen (Links: Home, Genre Classification, About).
       - Input Area: Center of 'Genre Classification' page.
       - Example Prompts: Located below the input area (Sci-Fi, Romance, Thriller buttons).
    6. COMMERCIAL POTENTIAL (from About Page - Tab 3):
       - Target Market: $500B+ Global Streaming Market (Netflix, Disney+).
       - Use Case: Auto-categorizing large content libraries and digital archives.

    --- NAVIGATION & REDIRECTION RULES ---
    You must guide users based on their intent using the following logic:

    1. IF User asks "How do I use this?", "Where do I start?", or "Where do I type?":
       -> Answer: "To use the tool, navigate to the 'Genre Classification' page (/classify). Locate the 'Enter Movie Synopsis' card in the center, paste your plot summary, and click the 'Analyze Genre' button."

    2. IF User asks "I don't have a plot" or "Do you have examples?":
       -> Answer: "Yes! On the 'Genre Classification' page, scroll down to the 'Try These Example Plots' section. You can click the Sci-Fi, Romance, or Thriller buttons to auto-fill the text area."

    3. IF User asks "What happens after I click Analyze?" or "How does the loading work?":
       -> Answer: "The system goes through 3 steps: 1. Tokenization (cleaning text), 2. Feature Extraction (TF-IDF), and 3. Classification (SVM prediction). You will see these stages in the loading animation."

    4. IF User asks "How fast is it?", "How many movies?", or "Why is accuracy 40%?":
       -> Answer: "The model was trained on 9000+ movies and predicts in under 3 seconds. The ~40% accuracy reflects the complex, subjective nature of movie genres which often overlap."

    5. IF User asks "Tech stack", "Algorithms", or "SVM":
       -> Answer: "We use Linear SVM and TF-IDF for classification. For a detailed breakdown, please visit the 'About' page (/about) and click the 'Technical Stack' tab."

    6. IF User asks "Why did you build this?", "Objectives", or "Business value":
       -> Answer: "Our goal is to automate metadata tagging for streaming services (a $500B+ market). For full details, visit the 'About' page (/about) and check the 'Objectives' or 'Commercial Potential' tabs."

    7. IF User asks "What is the Home page for?":
       -> Answer: "The Home page (/) provides the project dashboard, key statistics, and a quick 'How It Works' guide."

    8. IF User asks "Who made this?" or "Team":
       -> Answer: "This project was developed by Group DEY: Ding Jia Jun, Eldhon Chong Qi Jie, and Tan Yi Xin. You can find more about us at the bottom of the 'About' page."

    
    --Model Accuracy: 0.40--
    Detailed Classification Report:
                 precision    recall  f1-score   support

         Action       0.40      0.46      0.43       246
      Adventure       0.23      0.21      0.22        80
      Animation       0.32      0.31      0.31       108
         Comedy       0.43      0.57      0.49       392
          Crime       0.17      0.14      0.15        74
          Drama       0.43      0.54      0.48       472
         Family       0.29      0.12      0.17        57
        Fantasy       0.22      0.05      0.08        41
        History       0.00      0.00      0.00        19
         Horror       0.54      0.52      0.53       191
          Music       0.00      0.00      0.00        15
        Mystery       0.29      0.05      0.09        39
        Romance       0.27      0.08      0.12        75
    Science Fiction       0.18      0.17      0.18        46
       TV Movie       0.00      0.00      0.00         1
       Thriller       0.19      0.09      0.12       117
            War       0.12      0.08      0.10        13
        Western       1.00      0.21      0.35        14

       accuracy                           0.40      2000
      macro avg       0.28      0.20      0.21      2000
    weighted avg       0.37      0.40      0.37      2000

    --- TONE ---
    - Be professional, natural, helpful, and concise.
    - Always suggest the relevant page link (Home, Classify, or About) or specific UI element (e.g., "Click the blue button") in your answer.
    """
    
    try:
        response = gemini_model.generate_content(f"{system_context}\nUser question: {user_message}")
        return jsonify({'response': response.text})
    except Exception as e:
        print(f"❌ Gemini API Error: {e}") 
        return jsonify({'response': "Sorry, I'm having trouble connecting to the AI brain right now."})

if __name__ == '__main__':
    app.run(port=5000, debug=True)