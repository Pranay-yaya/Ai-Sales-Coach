import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, User, Globe, Database, Brain, Sliders } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-semibold text-white">Settings</h2>
        </div>

        <div className="space-y-6">
          {/* AI Model Settings */}
          <div className="border-b border-gray-700 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-indigo-400" />
              <h3 className="text-lg font-medium text-white">AI Model Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-200">GPT-4 Model</h4>
                  <p className="text-sm text-gray-400">Use advanced language model for analysis</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Response Temperature
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Analysis Settings */}
          <div className="border-b border-gray-700 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <h3 className="text-lg font-medium text-white">Analysis Configuration</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Minimum Word Count
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg bg-gray-700 border-gray-600 text-white"
                  defaultValue={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Sentiment Threshold
                </label>
                <select className="w-full rounded-lg bg-gray-700 border-gray-600 text-white">
                  <option value="high">High Sensitivity</option>
                  <option value="medium">Medium Sensitivity</option>
                  <option value="low">Low Sensitivity</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Enabled Metrics
                </label>
                <div className="space-y-2">
                  {['Sentiment Analysis', 'Engagement Score', 'Question Analysis', 'Key Moments'].map((metric) => (
                    <label key={metric} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-200">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border-b border-gray-700 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-indigo-400" />
              <h3 className="text-lg font-medium text-white">Notifications</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-200">Performance Reports</h4>
                  <p className="text-sm text-gray-400">Daily analysis summaries</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-200">Improvement Alerts</h4>
                  <p className="text-sm text-gray-400">Get notified about significant changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="border-b border-gray-700 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-indigo-400" />
              <h3 className="text-lg font-medium text-white">Integrations</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-200">CRM Integration</h4>
                  <p className="text-sm text-gray-400">Connect your sales CRM</p>
                </div>
                <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-200">Call Recording</h4>
                  <p className="text-sm text-gray-400">Zoom/Teams integration</p>
                </div>
                <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600">
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="border-b border-gray-700 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-indigo-400" />
              <h3 className="text-lg font-medium text-white">Security</h3>
            </div>
            <div className="space-y-4">
              <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                Change Password
              </button>
              <div>
                <h4 className="font-medium text-gray-200 mb-2">Two-Factor Authentication</h4>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-indigo-400" />
              <h3 className="text-lg font-medium text-white">Data Management</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-200 mb-2">Export Data</h4>
                <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600">
                  Download All Data
                </button>
              </div>
              <div>
                <h4 className="font-medium text-gray-200 mb-2">Data Retention</h4>
                <select className="w-full rounded-lg bg-gray-700 border-gray-600 text-white">
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="unlimited">Unlimited</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}