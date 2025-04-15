import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Trophy } from 'lucide-react';
import type { Analysis } from '../types';

export default function Dashboard() {
  const [conversation, setConversation] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeConversation = async () => {
    setIsAnalyzing(true);
    // Simulated API call
    setTimeout(() => {
      setAnalysis({
        id: '1',
        conversationId: '1',
        strengths: [
          'Excellent rapport building',
          'Clear value proposition',
          'Effective questioning technique'
        ],
        improvements: [
          'Could improve closing techniques',
          'Need more social proof examples',
          'Consider addressing objections earlier'
        ],
        score: 85,
        sentiment: {
          positive: 0.65,
          neutral: 0.25,
          negative: 0.1
        },
        keyMoments: [
          {
            timestamp: 120,
            type: 'interest',
            text: 'Customer showed strong interest in pricing structure',
            suggestion: 'Deep dive into ROI calculation'
          }
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Sales Conversation</h2>
        </div>
        <textarea
          className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Analysis Results</h2>
        </div>
        
        {analysis ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">{analysis.score}%</div>
              <div className="text-gray-600">Overall Score</div>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
              <ul className="list-disc list-inside space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700">{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-orange-600 mb-2">Areas for Improvement</h3>
              <ul className="list-disc list-inside space-y-2">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="text-gray-700">{improvement}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Key Moments</h3>
              <div className="space-y-3">
                {analysis.keyMoments.map((moment, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">
                      {Math.floor(moment.timestamp / 60)}:{(moment.timestamp % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="font-medium text-gray-900">{moment.text}</div>
                    {moment.suggestion && (
                      <div className="text-sm text-blue-600 mt-1">
                        Suggestion: {moment.suggestion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Enter a conversation and click analyze to see insights
          </div>
        )}
      </div>
    </div>
  );
}