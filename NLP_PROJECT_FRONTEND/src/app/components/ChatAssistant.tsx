// NLP_PROJECT_FRONTEND/src/app/components/ChatAssistant.tsx
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');
    setIsLoading(true);
//'http://127.0.0.1:5000/api/chat'
//'https://cinematch-1q5b.onrender.com/api/chat'
    try {
      const response = await fetch('https://cinematch-1q5b.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.response || "No response received." 
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = { 
        role: 'assistant', 
        content: "Error: Could not connect to backend." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full bg-white shadow-md">
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          Cinematch Assistant
        </h3>
        <p className="text-xs text-blue-100 mt-1">Powered by Cinematch</p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="h-12 w-12 mx-auto mb-3 text-blue-400" />
            <p className="text-sm">Ask me about Cinematch!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.role === 'user' ? <User className="h-5 w-5 text-blue-600" /> : <Bot className="h-5 w-5 text-gray-600" />}
                </div>
                <div className={`flex-1 px-4 py-2 rounded-lg whitespace-pre-wrap ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start ml-10">
                <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                   <Loader2 className="h-4 w-4 animate-spin text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t bg-gray-50">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 min-h-[50px] resize-none"
            onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 handleSubmit(e);
               }
            }}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}