import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Brain, MessageSquare, Trophy, ArrowRight, BarChart3, Settings, LogOut, MessageCircle, X } from 'lucide-react';
import type { Analysis } from './types';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm your AI assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! I'm here to help with any questions about the sales coaching platform.", 
        isUser: false 
      }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-gray-900 rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.isUser ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analysis' | 'reports' | 'settings'>('dashboard');
  const [conversation, setConversation] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeConversation = async () => {
    setIsAnalyzing(true);
    
    const words = conversation.toLowerCase().split(/\s+/);
    const sentences = conversation.split(/[.!?]+/).filter(Boolean);
    
    // Advanced sentiment analysis with more context
    const positiveWords = ['great', 'excellent', 'yes', 'interested', 'perfect', 'good', 'thanks', 'appreciate', 'value', 'benefit'];
    const negativeWords = ['no', 'not', "don't", 'expensive', 'difficult', 'problem', 'bad', 'wrong', 'concern', 'issue'];
    const engagementWords = ['tell', 'explain', 'understand', 'how', 'what', 'when', 'why', 'could', 'would'];
    
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    const engagementCount = words.filter(word => engagementWords.includes(word)).length;
    const totalWords = words.length;
    
    // Calculate advanced metrics
    const positive = positiveCount / totalWords;
    const negative = negativeCount / totalWords;
    const neutral = 1 - (positive + negative);
    const engagementScore = engagementCount / sentences.length;
    
    // Analyze conversation flow and structure
    const keyMoments = [];
    let currentContext = '';
    
    sentences.forEach((sentence, index) => {
      const lowerSentence = sentence.toLowerCase();
      
      // Price discussion analysis
      if (lowerSentence.includes('price') || lowerSentence.includes('cost') || lowerSentence.includes('budget')) {
        currentContext = 'pricing';
        keyMoments.push({
          timestamp: index * 30,
          type: 'concern',
          text: 'Price discussion initiated',
          suggestion: 'Focus on value proposition and ROI. Highlight long-term benefits and cost savings.'
        });
      }
      
      // Competition analysis
      if (lowerSentence.includes('competitor') || lowerSentence.includes('alternative') || lowerSentence.includes('other')) {
        currentContext = 'competition';
        keyMoments.push({
          timestamp: index * 30,
          type: 'objection',
          text: 'Competition comparison',
          suggestion: 'Emphasize unique features and competitive advantages. Use success stories.'
        });
      }
      
      // Customer interest indicators
      if (lowerSentence.includes('interested') || lowerSentence.includes('tell me more') || lowerSentence.includes('sounds good')) {
        currentContext = 'interest';
        keyMoments.push({
          timestamp: index * 30,
          type: 'interest',
          text: 'High interest detected',
          suggestion: 'Deep dive into specific features aligned with customer needs.'
        });
      }
      
      // Technical questions
      if (lowerSentence.includes('how does') || lowerSentence.includes('technical') || lowerSentence.includes('feature')) {
        currentContext = 'technical';
        keyMoments.push({
          timestamp: index * 30,
          type: 'concern',
          text: 'Technical inquiry',
          suggestion: 'Provide clear, benefit-focused explanations. Use analogies if needed.'
        });
      }
    });

    // Calculate comprehensive scoring
    const wordCount = words.length;
    const avgSentenceLength = wordCount / sentences.length;
    const questionCount = conversation.split('?').length - 1;
    
    // Scoring factors
    const interactionScore = Math.min((questionCount / sentences.length) * 100, 100);
    const clarityScore = Math.min((avgSentenceLength <= 20 ? 100 : 100 - (avgSentenceLength - 20) * 2), 100);
    const sentimentScore = (positive * 100) - (negative * 50);
    const engagementFactor = engagementScore * 100;
    
    const overallScore = Math.round(
      (interactionScore * 0.3) + 
      (clarityScore * 0.2) + 
      (sentimentScore * 0.3) + 
      (engagementFactor * 0.2)
    );

    // Generate dynamic insights
    const strengths = [];
    const improvements = [];

    // Question analysis
    if (questionCount > sentences.length * 0.3) {
      strengths.push('Strong discovery approach with effective questioning');
    } else {
      improvements.push('Increase open-ended questions to better understand customer needs');
    }

    // Engagement analysis
    if (engagementScore > 0.2) {
      strengths.push('Good engagement level with active conversation flow');
    } else {
      improvements.push('Enhance engagement by using more interactive language');
    }

    // Sentiment balance
    if (positive > negative * 2) {
      strengths.push('Maintained positive conversation tone while addressing concerns');
    } else {
      improvements.push('Focus on positive language while acknowledging concerns');
    }

    // Conversation structure
    if (keyMoments.length > 3) {
      strengths.push('Comprehensive coverage of key sales topics');
    } else {
      improvements.push('Cover more key sales points during the conversation');
    }

    // Technical vs benefit balance
    const technicalTerms = sentences.filter(s => 
      s.toLowerCase().includes('technical') || 
      s.toLowerCase().includes('feature') || 
      s.toLowerCase().includes('function')
    ).length;

    const benefitTerms = sentences.filter(s => 
      s.toLowerCase().includes('benefit') || 
      s.toLowerCase().includes('value') || 
      s.toLowerCase().includes('help')
    ).length;

    if (benefitTerms >= technicalTerms) {
      strengths.push('Good balance of features and benefits');
    } else {
      improvements.push('Focus more on benefits rather than technical features');
    }

    setTimeout(() => {
      setAnalysis({
        id: Date.now().toString(),
        conversationId: Date.now().toString(),
        strengths,
        improvements,
        score: Math.max(Math.min(overallScore, 100), 0),
        sentiment: {
          positive,
          neutral,
          negative
        },
        keyMoments,
        metrics: {
          wordCount,
          avgSentenceLength,
          questionCount,
          engagementScore: engagementFactor,
          clarityScore
        }
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-400" />
              <h1 className="text-xl font-bold text-white">AI Sales Coach</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-200">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'analysis' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Trophy className="w-5 h-5" />
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Reports
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">Sales Conversation</h2>
            </div>
            <textarea
              className="w-full h-64 p-4 bg-gray-700 text-white border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Paste your sales conversation here..."
              value={conversation}
              onChange={(e) => setConversation(e.target.value)}
            />
            <button
              onClick={analyzeConversation}
              disabled={!conversation || isAnalyzing}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                'Analyzing...'
              ) : (
                <>
                  Analyze Conversation
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">Analysis Results</h2>
            </div>
            
            {analysis ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-400">{analysis.score}%</div>
                  <div className="text-gray-400">Overall Score</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-400">
                      {Math.round(analysis.sentiment.positive * 100)}%
                    </div>
                    <div className="text-sm text-gray-400">Positive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-400">
                      {Math.round(analysis.sentiment.neutral * 100)}%
                    </div>
                    <div className="text-sm text-gray-400">Neutral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-400">
                      {Math.round(analysis.sentiment.negative * 100)}%
                    </div>
                    <div className="text-sm text-gray-400">Negative</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Words</div>
                    <div className="text-xl font-semibold text-white">{analysis.metrics.wordCount}</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Questions Asked</div>
                    <div className="text-xl font-semibold text-white">{analysis.metrics.questionCount}</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Engagement Score</div>
                    <div className="text-xl font-semibold text-white">{Math.round(analysis.metrics.engagementScore)}%</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Clarity Score</div>
                    <div className="text-xl font-semibold text-white">{Math.round(analysis.metrics.clarityScore)}%</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-green-400 mb-2">Strengths</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="text-gray-300">{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-orange-400 mb-2">Areas for Improvement</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="text-gray-300">{improvement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">Key Conversation Moments</h3>
                  <div className="space-y-3">
                    {analysis.keyMoments.map((moment, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">
                          {Math.floor(moment.timestamp / 60)}:{(moment.timestamp % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="font-medium text-white">{moment.text}</div>
                        {moment.suggestion && (
                          <div className="text-sm text-indigo-400 mt-1">
                            Suggestion: {moment.suggestion}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Enter a conversation and click analyze to see insights
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Brain className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white">AI Sales Coach</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Sign In
          </button>
        </form>
      </div>
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LoginPage />;
}

export default App;