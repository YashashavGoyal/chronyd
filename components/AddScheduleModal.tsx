'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PlusIcon, TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface HeaderField {
  key: string;
  value: string;
  enabled: boolean;
}

export default function AddScheduleModal({ isOpen, onClose, onSubmit }: AddScheduleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: 'https://',
    schedule: 'every-hour',
    customCron: '',
    agent: 'postman',
  });

  const [headers, setHeaders] = useState<HeaderField[]>([
    { key: 'Content-Type', value: 'application/json', enabled: true },
    { key: 'Accept', value: 'application/json', enabled: true },
  ]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: keyof HeaderField, value: string | boolean) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const scheduleData = {
      ...formData,
      headers: headers.filter(h => h.key.trim() !== '' && h.value.trim() !== ''),
    };
    
    onSubmit(scheduleData);
    
    // Reset form
    setFormData({
      name: '',
      url: 'https://',
      schedule: 'every-hour',
      customCron: '',
      agent: 'postman',
    });
    setHeaders([
      { key: 'Content-Type', value: 'application/json', enabled: true },
      { key: 'Accept', value: 'application/json', enabled: true },
    ]);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-xl font-bold text-white">
                  Create New Schedule
                </Dialog.Title>
                <p className="text-gray-400 text-sm mt-1">Configure automated URL monitoring</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Schedule Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white"
                  placeholder="e.g., Health Check API"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Target URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white font-mono text-sm"
                  placeholder="https://api.example.com/health"
                />
              </div>
            </div>

            {/* Schedule & Agent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Frequency
                </label>
                <select
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white"
                >
                  <option value="every-minute">Every Minute</option>
                  <option value="every-5-minutes">Every 5 Minutes</option>
                  <option value="every-15-minutes">Every 15 Minutes</option>
                  <option value="every-hour">Every Hour</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom Cron</option>
                </select>
                
                {formData.schedule === 'custom' && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-white mb-2">
                      Cron Expression
                    </label>
                    <input
                      type="text"
                      value={formData.customCron}
                      onChange={(e) => setFormData({ ...formData, customCron: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white font-mono text-sm"
                      placeholder="*/5 * * * *"
                    />
                    <p className="text-gray-500 text-xs mt-2">
                      * * * * * = minute hour day month day-of-week
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Agent / User-Agent
                </label>
                <select
                  value={formData.agent}
                  onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white"
                >
                  <option value="postman">Postman</option>
                  <option value="firefox">Firefox</option>
                  <option value="chrome">Chrome</option>
                  <option value="safari">Safari</option>
                  <option value="edge">Edge</option>
                  <option value="curl">cURL</option>
                </select>
                <p className="text-gray-500 text-xs mt-2">
                  Simulates different browser/agent requests
                </p>
              </div>
            </div>

            {/* Headers Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Custom Headers
                  </label>
                  <p className="text-gray-500 text-xs mt-1">
                    Headers will be randomly selected from enabled options
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addHeader}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Header
                </button>
              </div>
              
              <div className="space-y-3">
                {headers.map((header, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateHeader(index, 'key', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all text-white text-sm"
                          placeholder="Header key (e.g., Authorization)"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateHeader(index, 'value', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all text-white text-sm"
                          placeholder="Header value"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={header.enabled}
                          onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-300 text-sm">Enabled</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeHeader(index)}
                        className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <QuestionMarkCircleIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-300 font-medium mb-1">How it works</p>
                  <ul className="text-blue-400/80 text-sm space-y-1">
                    <li>• URLs are called at the specified frequency</li>
                    <li>• Headers are randomly selected from enabled options</li>
                    <li>• Each agent uses different User-Agent strings</li>
                    <li>• All executions are logged for monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-lg"
              >
                Create Schedule
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}