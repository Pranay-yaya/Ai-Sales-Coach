import React from 'react';
import { LineChart, BarChart3, PieChart } from 'lucide-react';

export default function Analysis() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Performance Trend</h2>
          </div>
          <div className="text-3xl font-bold text-indigo-600">85%</div>
          <p className="text-gray-600">Average Score</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">Conversations</h2>
          </div>
          <div className="text-3xl font-bold text-green-600">124</div>
          <p className="text-gray-600">Total Analyzed</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold">Success Rate</h2>
          </div>
          <div className="text-3xl font-bold text-orange-600">68%</div>
          <p className="text-gray-600">Conversion Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Detailed Analysis</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Top Performing Areas</h3>
            <div className="space-y-2">
              {['Product Knowledge', 'Customer Engagement', 'Follow-up Timing'].map((area, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{area}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${90 - index * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{90 - index * 10}%</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Areas for Improvement</h3>
            <div className="space-y-2">
              {['Objection Handling', 'Closing Techniques', 'Price Negotiation'].map((area, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{area}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full"
                        style={{ width: `${60 + index * 5}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{60 + index * 5}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}