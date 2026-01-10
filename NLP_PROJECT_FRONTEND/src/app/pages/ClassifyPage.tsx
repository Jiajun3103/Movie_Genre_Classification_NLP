//C:\Users\user\Documents\a y3s1\NATURAL LANGUAGE PROCESSING\project2\NLP_PROJECT\src\app\pages\ClassifyPage.tsx
import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Progress } from '../components/ui/progress';

export function ClassifyPage() {
  const [plotText, setPlotText] = useState('');
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // genre prediction function
  const predictGenre = async (text: string): Promise<string> => {
    try {
      //http://127.0.0.1:5000/api/predict
      const response = await fetch('https://cinematch-1q5b.onrender.com/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data.genre; 
    } catch (error) {
      console.error("Error predicting genre:", error);
      throw error;
    }
};

  const handleAnalyze = async () => {
    if (!plotText.trim()) {
      setError('Please provide a movie plot to proceed.');
      return;
    }

    setError(null);
    setPrediction(null);
    setLoading(true);

    try {
      const result = await predictGenre(plotText);
      setPrediction(result);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center">
              <Sparkles className="h-10 w-10 mr-3 text-blue-600" />
              Movie Genre Classification
            </h1>
            <p className="text-lg text-gray-600">
              Professional genre prediction using Support Vector Machines and NLP
            </p>
          </div>

          {/* Input Card */}
          <Card className="border-2 shadow-md">
            <CardHeader>
              <CardTitle>Enter Movie Synopsis</CardTitle>
              <CardDescription>
                Paste the movie plot or overview below for AI-powered genre analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={plotText}
                onChange={(e) => setPlotText(e.target.value)}
                placeholder="Example: A young wizard discovers his magical heritage and embarks on an adventure at a school of witchcraft and wizardry..."
                className="min-h-[200px] resize-none text-base"
              />
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{plotText.length} characters</span>
                <span>Recommended: 100-500 characters</span>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={loading || !plotText.trim()}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze Genre
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && (
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-blue-900 font-medium mb-3">Analyzing text patterns...</p>
                    <Progress value={66} className="h-2" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-gray-600">Tokenization</p>
                      <p className="text-blue-600 font-semibold mt-1">✓ Complete</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-gray-600">Feature Extraction</p>
                      <p className="text-blue-600 font-semibold mt-1">⟳ Processing</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-gray-600">Classification</p>
                      <p className="text-gray-400 font-semibold mt-1">⋯ Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Prediction Result */}
          {prediction && !loading && (
            <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-green-900">
                  🎯 Prediction Complete!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-6 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Predicted Genre:</p>
                  <p className="text-4xl font-bold text-green-600 mb-4">{prediction}</p>
                  <Progress value={100} className="h-2 mb-2" />
                  <p className="text-xs text-gray-500">
                    Classification based on trained SVM Model (Accuracy: 40%)
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> This prediction is generated using TF-IDF vectorization and Linear SVM. 
                    The model was trained on the Kaggle Movies Dataset with multiple genre categories.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Note */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="text-3xl">💬</div>
                <div>
                  <p className="font-semibold text-purple-900">Need Help?</p>
                  <p className="text-sm text-purple-700">
                    Click the chat button in the bottom-right corner to talk with our AI assistant!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}