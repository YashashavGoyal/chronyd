'use client';

import { 
  TrashIcon, 
  PlayIcon, 
  PauseIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

interface Schedule {
  _id: string;
  name: string;
  url: string;
  schedule: string;
  agent: string;
  enabled: boolean;
  lastRun: string | null;
  lastStatus: string | null;
  headers: Array<{ key: string; value: string; enabled: boolean }>;
}

interface ScheduleListProps {
  schedules: Schedule[];
  loading: boolean;
  onDelete: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
  onExecute: (id: string) => void;
}

export default function ScheduleList({ 
  schedules, 
  loading, 
  onDelete, 
  onToggle, 
  onExecute 
}: ScheduleListProps) {
  
  const getScheduleDisplay = (schedule: string) => {
    const scheduleMap: Record<string, string> = {
      'every-minute': 'Every Minute',
      'every-5-minutes': 'Every 5 Min',
      'every-15-minutes': 'Every 15 Min',
      'every-hour': 'Every Hour',
      'daily': 'Daily',
      'weekly': 'Weekly',
      'custom': 'Custom',
    };
    return scheduleMap[schedule] || schedule;
  };

  const getAgentColor = (agent: string) => {
    const agentMap: Record<string, string> = {
      'postman': 'bg-orange-500',
      'firefox': 'bg-orange-600',
      'chrome': 'bg-green-500',
      'safari': 'bg-blue-500',
      'edge': 'bg-blue-600',
      'curl': 'bg-gray-600',
    };
    return agentMap[agent] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-12 text-center">
        <ArrowPathIcon className="w-12 h-12 mx-auto text-gray-400 animate-spin" />
        <p className="mt-4 text-gray-400 text-lg">Loading schedules...</p>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-12 text-center">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mb-6">
          <ClockIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No schedules yet</h3>
        <p className="text-gray-400 text-lg mb-6">Create your first schedule to get started</p>
        <p className="text-gray-500">Click "New Schedule" to begin automating your API calls</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {schedules.map((schedule) => {
        const agentColor = getAgentColor(schedule.agent);
        const enabledHeaders = schedule.headers.filter(h => h.enabled).length;
        
        return (
          <div 
            key={schedule._id} 
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all"
          >
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${agentColor}`}></div>
                  <h3 className="text-xl font-bold text-white">{schedule.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${schedule.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                    {schedule.enabled ? 'Active' : 'Paused'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <a 
                    href={schedule.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm truncate max-w-md"
                  >
                    {schedule.url}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onExecute(schedule._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <PlayIcon className="w-4 h-4" />
                  Run Now
                </button>
                
                <button
                  onClick={() => onToggle(schedule._id, !schedule.enabled)}
                  className={`p-2 rounded-lg transition-colors ${schedule.enabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}
                  title={schedule.enabled ? 'Pause' : 'Resume'}
                >
                  {schedule.enabled ? (
                    <PauseIcon className="w-4 h-4 text-gray-300" />
                  ) : (
                    <PlayIcon className="w-4 h-4 text-white" />
                  )}
                </button>
                
                <button
                  onClick={() => onDelete(schedule._id)}
                  className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                  title="Delete"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-700/50">
              <div>
                <p className="text-gray-400 text-sm mb-1">Schedule</p>
                <p className="text-white font-medium">{getScheduleDisplay(schedule.schedule)}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Agent</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${agentColor}`}></div>
                  <p className="text-white capitalize">{schedule.agent}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Headers</p>
                <p className="text-white">
                  {enabledHeaders} active • {schedule.headers.length} total
                </p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Last Run</p>
                <div className="flex items-center gap-2">
                  {schedule.lastStatus === 'success' ? (
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  ) : schedule.lastStatus === 'failed' ? (
                    <XCircleIcon className="w-4 h-4 text-red-400" />
                  ) : (
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                  )}
                  <p className="text-white">
                    {schedule.lastRun ? (
                      formatDistanceToNow(new Date(schedule.lastRun), { addSuffix: true })
                    ) : 'Never'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/50">
              <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                ID: {schedule._id.substring(0, 8)}...
              </span>
              {schedule.headers.slice(0, 3).map((header, idx) => (
                <span 
                  key={idx}
                  className={`px-2 py-1 rounded text-xs ${header.enabled ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-700/30 text-gray-500'}`}
                >
                  {header.key}: {header.value.substring(0, 10)}...
                </span>
              ))}
              {schedule.headers.length > 3 && (
                <span className="px-2 py-1 bg-gray-700/30 text-gray-400 rounded text-xs">
                  +{schedule.headers.length - 3} more
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}