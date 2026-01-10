//C:\Users\user\Documents\a y3s1\NATURAL LANGUAGE PROCESSING\project2\NLP_PROJECT\src\app\pages\AboutPage.tsx
import { Code, Target, Briefcase, Users, Database, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Cinematch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An intelligent NLP-based system for automated movie genre classification, 
            developed by Group DEY as part of the Natural Language Processing project
          </p>
        </div>

        {/* Project Overview */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="text-2xl">Project Overview</CardTitle>
            <CardDescription className="text-blue-100">
              Advanced machine learning for cinematic content analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Cinematch is a cutting-edge Natural Language Processing application that leverages 
              machine learning algorithms to automatically classify movie genres based on plot summaries. 
              Using TF-IDF vectorization combined with Support Vector Machines, our system analyzes 
              textual patterns to predict genre categories with intelligent precision.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The project demonstrates the practical application of NLP in the entertainment industry, 
              offering a scalable solution for content organization, metadata tagging, and automated 
              categorization of digital cinema libraries.
            </p>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="technical" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="technical" className="py-3">
              <Code className="h-4 w-4 mr-2" />
              Technical Stack
            </TabsTrigger>
            <TabsTrigger value="objectives" className="py-3">
              <Target className="h-4 w-4 mr-2" />
              Objectives
            </TabsTrigger>
            <TabsTrigger value="commercial" className="py-3">
              <Briefcase className="h-4 w-4 mr-2" />
              Commercial Potential
            </TabsTrigger>
          </TabsList>

          {/* Technical Stack Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Cpu className="h-6 w-6 text-blue-600 mr-2" />
                    <CardTitle className="text-lg">Core Algorithms</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">TF-IDF Vectorization</h4>
                    <p className="text-sm text-gray-600">
                      Term Frequency-Inverse Document Frequency for converting text into numerical 
                      features that capture the importance of words in the plot summary.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Linear Support Vector Machine</h4>
                    <p className="text-sm text-gray-600">
                      High-performance classifier that finds optimal hyperplanes to separate 
                      different genre categories in high-dimensional feature space.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Code className="h-6 w-6 text-indigo-600 mr-2" />
                    <CardTitle className="text-lg">NLP Libraries & Tools</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">NLTK (Natural Language Toolkit)</h4>
                    <p className="text-sm text-gray-600">
                      Advanced text processing including Porter Stemming for word normalization 
                      and stopword removal for noise reduction.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Scikit-Learn</h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive machine learning pipeline for model training, validation, 
                      and deployment with optimized performance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Database className="h-6 w-6 text-purple-600 mr-2" />
                    <CardTitle className="text-lg">Dataset</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-2">Kaggle Movies Dataset</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Comprehensive collection of movie metadata including plot summaries, genres, 
                    ratings, and other features from thousands of films across multiple decades.
                  </p>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-900">
                      <strong>Training Size:</strong> 9000+ movies with labeled genres for 
                      supervised learning and model validation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Cpu className="h-6 w-6 text-green-600 mr-2" />
                    <CardTitle className="text-lg">Model Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Accuracy</span>
                      <span className="text-2xl font-bold text-green-600">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      The 60% accuracy reflects the inherent complexity of movie genre classification, 
                      where plots often span multiple genres and subjective interpretation plays a role.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Objectives Tab */}
          <TabsContent value="objectives" className="space-y-6">
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="text-2xl">Project Objectives</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Intelligent Document Classification System
                      </h3>
                      <p className="text-gray-700">
                        Develop a robust NLP-based system capable of automatically categorizing 
                        movie content based on textual descriptions. This involves implementing 
                        state-of-the-art text processing techniques, feature extraction methods, 
                        and machine learning algorithms to achieve reliable genre predictions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Automated Metadata Tagging
                      </h3>
                      <p className="text-gray-700">
                        Create an efficient solution for automating the metadata tagging process 
                        in digital cinema libraries. This reduces manual labor, improves consistency, 
                        and enables large-scale content organization for streaming platforms and 
                        media archives.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        NLP Research & Innovation
                      </h3>
                      <p className="text-gray-700">
                        Advance the field of Natural Language Processing by exploring effective 
                        techniques for entertainment content analysis. Contribute to academic research 
                        on text classification challenges and demonstrate practical applications of 
                        machine learning in the media industry.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commercial Potential Tab */}
          <TabsContent value="commercial" className="space-y-6">
            <Card className="border-2 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-2xl">Commercial Applications</CardTitle>
                <CardDescription>
                  Real-world use cases and business opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Streaming Platforms
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Deploy as a scalable API service for Netflix, Amazon Prime, Disney+, and other 
                      streaming services to automatically categorize their vast content libraries.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time content classification</li>
                      <li>• User-generated content tagging</li>
                      <li>• Improved recommendation systems</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-indigo-200">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      Digital Archives
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Assist film archives, museums, and libraries in organizing historical movie 
                      collections with consistent and accurate genre metadata.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Batch processing capabilities</li>
                      <li>• Legacy content organization</li>
                      <li>• Enhanced searchability</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Content Creators
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Provide filmmakers and production studios with instant genre analysis to 
                      understand their content positioning and target audience.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Script analysis tools</li>
                      <li>• Marketing strategy insights</li>
                      <li>• Competitive analysis</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-pink-200">
                    <h3 className="text-lg font-semibold text-pink-900 mb-3 flex items-center">
                      <Cpu className="h-5 w-5 mr-2" />
                      API-as-a-Service
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Monetize the model through a subscription-based API service offering 
                      genre classification as a microservice for various applications.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• RESTful API endpoints</li>
                      <li>• Tiered pricing models</li>
                      <li>• Enterprise integration</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Market Opportunity</h3>
                  <p className="text-blue-100 mb-4">
                    With the global streaming market valued at over $500 billion and growing, 
                    automated content classification represents a significant opportunity. 
                    Cinematch is positioned to capture value in the media technology sector.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">$500B+</div>
                      <div className="text-sm text-blue-200">Market Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">25%</div>
                      <div className="text-sm text-blue-200">Annual Growth</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">10M+</div>
                      <div className="text-sm text-blue-200">Daily Content</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Team Section */}
        <Card className="mt-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <CardTitle className="text-2xl">Development Team</CardTitle>
            <CardDescription className="text-gray-300">
              NLP Project - Group DEY
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-700 text-lg mb-4">
                This project was developed as part of the Natural Language Processing course 
                (Year 3, Semester 1) by Group DEY.
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-sm text-blue-900">
                  <strong>Member:</strong> <br />
                  <strong>1.</strong> DING JIA JUN<br />
                  <strong>2.</strong> ELDHON CHONG QI JIE<br />
                  <strong>3.</strong> TAN YI XIN
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
