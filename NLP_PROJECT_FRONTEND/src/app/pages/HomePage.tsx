//C:\Users\user\Documents\a y3s1\NATURAL LANGUAGE PROCESSING\project2\NLP_PROJECT\src\app\pages\HomePage.tsx
import { Link } from 'react-router-dom';
import { Film, TrendingUp, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <Film className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Cinematch
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Movie Genre Classification powered by Natural Language Processing
            </p>
            <p className="text-lg mb-10 text-blue-50 max-w-2xl mx-auto">
              Leveraging Support Vector Machines (SVM) and advanced NLP techniques to categorize cinema with precision
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/classify">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  Try Genre Classifier
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Cinematch?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cutting-edge technology meets cinematic analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Fast & Accurate</CardTitle>
              <CardDescription>
                Instant genre predictions using state-of-the-art machine learning algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our TF-IDF and Linear SVM model processes plot summaries in milliseconds, providing immediate genre classifications.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-indigo-500 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>NLP Powered</CardTitle>
              <CardDescription>
                Advanced natural language processing for intelligent text analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Utilizing NLTK for stemming and stopword removal, ensuring clean and accurate feature extraction.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-500 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Scalable Solution</CardTitle>
              <CardDescription>
                Designed for real-world applications and enterprise deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Perfect for streaming platforms, content libraries, and digital cinema organizations seeking automation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, powerful, and intelligent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Plot</h3>
              <p className="text-gray-600">
                Paste your movie plot summary or overview into the text area
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our ML model analyzes patterns and linguistic features using NLP
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-gray-600">
                Receive instant genre classification with confidence scores
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/classify">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Classifying Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">9000+</div>
            <div className="text-gray-600">Movies Analyzed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">60%</div>
            <div className="text-gray-600">Model Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-gray-600">Genre Categories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-600 mb-2">&lt;3s</div>
            <div className="text-gray-600">Prediction Time</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Classify Your Movie?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Experience the power of movies genre classification
          </p>
          <Link to="/classify">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}