import React from 'react';
import { MessageSquare, Trophy, BarChart3, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: 'dashboard' | 'analysis' | 'reports' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'analysis' | 'reports' | 'settings') => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <div className="flex gap-8 mb-8">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab('analysis')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'analysis' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Trophy className="w-5 h-5" />
        Analysis
      </button>
      <button
        onClick={() => setActiveTab('reports')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <BarChart3 className="w-5 h-5" />
        Reports
      </button>
      <button
        onClick={() => setActiveTab('settings')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Settings className="w-5 h-5" />
        Settings
      </button>
    </div>
  );
}