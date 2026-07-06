'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import ScheduleList from './ScheduleList';
import AddScheduleModal from './AddScheduleModal';
import { PlusIcon, ArrowPathIcon, CheckCircleIcon, PlayCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

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
  method?: string;
  body?: string;
}

export default function Dashboard() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/schedules');
      const data = await res.json();
      if (data.success) {
        setSchedules(data.data || []);
      } else {
        setError(data.error || 'Failed to load schedules');
        console.error('Failed to fetch schedules:', data.error);
      }
    } catch (error: any) {
      setError(error.message || 'Error fetching schedules');
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleNewScheduleClick = () => {
    setScheduleToEdit(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditClick = (schedule: Schedule) => {
    setScheduleToEdit(schedule);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAddSchedule = async (scheduleData: any) => {
    try {
      if (modalMode === 'edit' && scheduleToEdit) {
        // PUT request to update
        const res = await fetch(`/api/schedules/${scheduleToEdit._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scheduleData),
        });
        const data = await res.json();
        if (data.success) {
          setIsModalOpen(false);
          fetchSchedules();
          alert('Schedule updated successfully!');
        } else {
          alert('Failed to update schedule: ' + data.error);
        }
      } else {
        // POST request to create
        const res = await fetch('/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scheduleData),
        });
        const data = await res.json();
        if (data.success) {
          setIsModalOpen(false);
          fetchSchedules();
          alert('Schedule created successfully!');
        } else {
          alert('Failed to create schedule: ' + data.error);
        }
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule');
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;
    
    try {
      const res = await fetch(`/api/schedules/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchSchedules();
        alert('Schedule deleted successfully!');
      } else {
        alert('Failed to delete schedule: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule');
    }
  };

  const handleToggleSchedule = async (id: string, enabled: boolean) => {
    try {
      const res = await fetch(`/api/schedules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSchedules();
      } else {
        console.error('Failed to toggle schedule:', data.error);
      }
    } catch (error) {
      console.error('Error toggling schedule:', error);
    }
  };

  const handleExecuteSchedule = async (id: string) => {
    try {
      const schedule = schedules.find(s => s._id === id);
      if (!schedule) return;
      
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scheduleId: id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSchedules();
        alert(`Execution completed! Status: ${data.data.result.success ? 'Success' : 'Failed'}`);
      } else {
        alert('Failed to execute: ' + data.error);
      }
    } catch (error) {
      console.error('Error executing schedule:', error);
      alert('Error executing schedule');
    }
  };

  const activeSchedules = schedules.filter(s => s.enabled).length;
  const successfulRuns = schedules.filter(s => s.lastStatus === 'success').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Automated URL Scheduler
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Schedule API calls, monitor responses, and test endpoints with custom agents and headers
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/30 border border-red-800/50 rounded-xl flex items-start gap-3">
            <span className="text-red-400 text-xl flex-shrink-0">⚠️</span>
            <div>
              <h3 className="text-red-200 font-bold text-sm">Database Connection Alert</h3>
              <p className="text-red-400/90 text-sm mt-1">
                Could not establish a connection to your MongoDB database. 
                If you are using MongoDB Atlas, please check that your current network IP address is added to the 
                <a href="https://cloud.mongodb.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 mx-1">
                  Atlas IP Whitelist
                </a> 
                and that your connection string in <code className="bg-gray-800 px-1 py-0.5 rounded font-mono text-xs text-white">.env.local</code> is correct. (Error: {error})
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Schedules</p>
                <p className="text-3xl font-bold text-white mt-2">{schedules.length}</p>
              </div>
              <ClockIcon className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Schedules</p>
                <p className="text-3xl font-bold text-green-500 mt-2">{activeSchedules}</p>
              </div>
              <PlayCircleIcon className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Success Rate</p>
                <p className="text-3xl font-bold text-purple-500 mt-2">
                  {schedules.length > 0 ? `${Math.round((successfulRuns / schedules.length) * 100)}%` : '0%'}
                </p>
              </div>
              <CheckCircleIcon className="w-10 h-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Your Schedules</h2>
            <p className="text-gray-400">Manage and monitor all your automated URL calls</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSchedules}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Refresh
            </button>
            
            <button
              onClick={handleNewScheduleClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              New Schedule
            </button>
          </div>
        </div>

        {/* Schedules List */}
        <ScheduleList
          schedules={schedules}
          loading={loading}
          onDelete={handleDeleteSchedule}
          onToggle={handleToggleSchedule}
          onExecute={handleExecuteSchedule}
          onEdit={handleEditClick}
        />

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-400 font-bold">🌐</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multiple Agents</h3>
            <p className="text-gray-400">Use Postman, Firefox, Chrome, or custom agents for your API calls</p>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-400 font-bold">🔀</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Random Headers</h3>
            <p className="text-gray-400">Configure headers to be randomly selected on each request for testing</p>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-400 font-bold">📊</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Detailed Logs</h3>
            <p className="text-gray-400">Track every execution with response times, status codes, and headers used</p>
          </div>
        </div>
      </main>
      
      <AddScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSchedule}
        scheduleToEdit={scheduleToEdit}
        mode={modalMode}
      />
    </div>
  );
}