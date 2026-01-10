// NLP_PROJECT_FRONTEND/src/app/components/FloatingChatbot.tsx
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, X, Minimize2, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion'; 

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const scrollRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 1. Immediately display user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = input;
    setInput(''); // Clear input field
    setIsLoading(true); // Start loading

    try {
      // 2. Send request to Python backend
      // The backend will automatically apply the Prompt defined in api.py
      // 'http://127.0.0.1:5000/api/chat'
      // 'https://cinematch-1q5b.onrender.com/api/chat'
      const response = await fetch('https://cinematch-1q5b.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // 3. Display AI response
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.response || "Sorry, I didn't get a response." 
      };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: "Sorry, I can't connect to the server right now. Please ensure the backend is running." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle quick question clicks
  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Optional: Could add slight delay or auto-submit logic here
    // Could also call handleSubmit directly, but requires mocking the event
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 relative group"
            >
              <MessageCircle className="h-8 w-8 text-white" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className={`shadow-2xl border-2 border-blue-200 overflow-hidden bg-white ${
              isMinimized ? 'w-80' : 'w-96 h-[600px]'
            }`}>
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-between">
                <div className="flex items-center text-white">
                  <Bot className="h-6 w-6 mr-2" />
                  <div>
                    <h3 className="font-semibold">Cinematch Assistant</h3>
                    {!isMinimized && (
                      <p className="text-xs text-blue-100">Powered by Cinematch AI</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:bg-white/20 rounded p-1">
                    <Minimize2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded p-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Message Area */}
                  <ScrollArea className="flex-1 p-4 h-[400px]" ref={scrollRef}>
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-500 mt-12">
                        <Bot className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                        <p className="font-medium mb-2">Hi! I'm your Cinematch AI Assistant 👋</p>
                        <p className="text-sm mb-4">I can answer questions about movie genres, tech stack, or this project.</p>
                        <div className="space-y-2 text-left max-w-xs mx-auto">
                          <button onClick={() => handleQuickQuestion("How do I use this?")} className="w-full text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-2 text-left">
                            💡 How do I use this?
                          </button>
                          <button onClick={() => handleQuickQuestion("Tell me about the tech stack")} className="w-full text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg p-2 text-left">
                            🔧 Tell me about the tech stack
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <div key={index} className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-blue-500' : 'bg-gray-200'}`}>
                              {message.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-gray-700" />}
                            </div>
                            <div className={`flex-1 px-4 py-2 rounded-lg whitespace-pre-wrap ${message.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                              <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>
                          </div>
                        ))}
                        {/* Loading Animation */}
                        {isLoading && (
                          <div className="flex items-start space-x-2">
                            <div className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center">
                              <Bot className="h-5 w-5 text-gray-700" />
                            </div>
                            <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-tl-none flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin text-gray-500 mr-2" />
                              <span className="text-xs text-gray-500">Thinking...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t bg-gray-50">
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 min-h-[60px] resize-none bg-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                      />
                      <Button 
                        type="submit" 
                        size="icon" 
                        className="h-[60px] w-[60px] bg-blue-500 hover:bg-blue-600"
                        disabled={!input.trim() || isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}