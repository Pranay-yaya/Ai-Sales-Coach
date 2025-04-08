import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { MessageSquare, Send, Sparkles, BarChart, LogOut } from 'lucide-react';
import { Auth } from './components/Auth';
import { Report } from './components/Report';
import { Chatbot } from './components/Chatbot';

interface Feedback {
  strength: string;
  improvement: string;
  score: number;
}

function Dashboard() {
  const [conversation, setConversation] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const analyzeSalesConversation = async () => {
    setAnalyzing(true);
    // Simulated API call - in production, replace with actual API
    setTimeout(() => {
      setFeedback({
        strength: "Good rapport building and active listening",
        improvement: "Could improve value proposition and handling objections",
        score: 85
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-indigo-600" />
            <h2 className="text-xl font-semibold">Sales Conversation</h2>
          </div>
          <textarea
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Paste your sales conversation here..."
            value={conversation}
            onChange={(e) => setConversation(e.target.value)}
          />
          <button
            onClick={analyzeSalesConversation}
            disabled={analyzing || !conversation}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium
              ${analyzing || !conversation ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Analyze Conversation
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="text-indigo-600" />
            <h2 className="text-xl font-semibold">Analysis Results</h2>
          </div>
          
          {feedback ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Conversation Score</span>
                <span className="text-2xl font-bold text-indigo-600">{feedback.score}%</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-green-600 w-5 h-5" />
                  <h3 className="font-medium text-gray-800">Strengths</h3>
                </div>
                <p className="text-gray-600 bg-green-50 p-3 rounded-lg">{feedback.strength}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="text-amber-600 w-5 h-5" />
                  <h3 className="font-medium text-gray-800">Areas for Improvement</h3>
                </div>
                <p className="text-gray-600 bg-amber-50 p-3 rounded-lg">{feedback.improvement}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Enter a conversation and click analyze to see insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">AI Sales Coach</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
              <Link to="/report" className="text-gray-600 hover:text-indigo-600">Report</Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {children}
      <Chatbot />
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;