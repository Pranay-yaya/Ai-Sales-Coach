import React from 'react';
import { BarChart, PieChart, Users, TrendingUp, Calendar } from 'lucide-react';

export function Report() {
  const mockData = {
    totalCalls: 156,
    avgScore: 82,
    improvement: 15,
    topStrengths: ['Active Listening', 'Product Knowledge', 'Rapport Building'],
    monthlyProgress: [65, 70, 75, 82],
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sales Performance Report</h1>
        <p className="text-gray-600">Monthly analysis and insights of your sales conversations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-indigo-600" />
            <h3 className="font-semibold">Total Calls</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{mockData.totalCalls}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <BarChart className="text-indigo-600" />
            <h3 className="font-semibold">Average Score</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{mockData.avgScore}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-green-600" />
            <h3 className="font-semibold">Improvement</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">+{mockData.improvement}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-indigo-600" />
            <h3 className="font-semibold">Monthly Trend</h3>
          </div>
          <div className="flex items-end justify-between h-12">
            {mockData.monthlyProgress.map((score, index) => (
              <div
                key={index}
                style={{ height: `${score}%` }}
                className="w-4 bg-indigo-600 rounded-t"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="text-indigo-600" />
            <h3 className="font-semibold">Top Strengths</h3>
          </div>
          <ul className="space-y-4">
            {mockData.topStrengths.map((strength, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <BarChart className="text-indigo-600" />
            <h3 className="font-semibold">Recent Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Listening</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Objection Handling</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Closing Rate</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}