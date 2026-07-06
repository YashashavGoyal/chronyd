'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface ExecutionLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: any;
}

export default function ExecutionLogsModal({ isOpen, onClose, schedule }: ExecutionLogsModalProps) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const fetchLogs = async () => {
    if (!schedule) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/schedules/${schedule._id}/logs`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && schedule) {
      fetchLogs();
      setExpandedLogId(null);
    }
  }, [isOpen, schedule]);

  const toggleExpandLog = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <Dialog.Title className="text-xl font-bold text-white">
                Execution Logs
              </Dialog.Title>
              <p className="text-gray-400 text-sm mt-1">
                History for <span className="text-blue-400 font-mono">{schedule?.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchLogs}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                title="Refresh logs"
                type="button"
              >
                <ArrowPathIcon className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                type="button"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading && logs.length === 0 ? (
              <div className="py-12 text-center">
                <ArrowPathIcon className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-3" />
                <p className="text-gray-400">Loading history...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                No execution logs found for this schedule. Trigger "Run Now" to create your first log.
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => {
                  const isExpanded = expandedLogId === log._id;
                  return (
                    <div 
                      key={log._id} 
                      className="border border-gray-800 rounded-lg bg-gray-850 overflow-hidden transition-all"
                    >
                      <div 
                        onClick={() => toggleExpandLog(log._id)}
                        className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-gray-800/40 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {log.status === 'success' ? (
                            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-white text-sm font-semibold">
                              {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </p>
                            {log.error && (
                              <p className="text-red-400 text-xs mt-0.5 truncate max-w-md">{log.error}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className={`px-2 py-0.5 text-xs rounded font-bold font-mono ${log.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            HTTP {log.statusCode || 'N/A'}
                          </span>
                          <span className="text-gray-400 text-sm font-mono">{log.responseTime}ms</span>
                          <span className="text-gray-500 text-xs">
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 border-t border-gray-800 bg-gray-900/50 space-y-3 font-mono text-xs">
                          {log.headersUsed && log.headersUsed.length > 0 && (
                            <div>
                              <p className="text-gray-400 font-bold mb-1">Headers Used:</p>
                              <pre className="bg-gray-950 p-2 rounded text-gray-300 overflow-x-auto whitespace-pre-wrap break-all">
                                {JSON.stringify(log.headersUsed, null, 2)}
                              </pre>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-400 font-bold mb-1">Response Body:</p>
                            <pre className="bg-gray-950 p-2 rounded text-gray-300 overflow-x-auto max-h-48 overflow-y-auto whitespace-pre-wrap break-all">
                              {log.responseBody || '(No response body)'}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
