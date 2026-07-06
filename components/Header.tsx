'use client';

import { GlobeAltIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <GlobeAltIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ChronoSphere</h1>
              <p className="text-gray-400 text-sm">AI-Powered URL Scheduler</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              <PlusIcon className="w-4 h-4" />
              <span className="hidden sm:inline">New Schedule</span>
            </button>
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
        </div>
      </div>
    </header>
  );
}