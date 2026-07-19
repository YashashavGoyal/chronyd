"use client";

import { useState } from "react";
import { 
  PlusCircle, 
  Play, 
  Plus, 
  Trash2, 
  FileText, 
  Pencil, 
  Pause, 
  Link as LinkIcon, 
  CheckCircle2, 
  X, 
  AlertTriangle,
  Terminal,
  Hash,
  Clock,
  RefreshCw
} from "lucide-react";

// Types
type HeaderKV = { id: string; key: string; value: string; enabled: boolean };
type JobStatus = "Active" | "Paused";
type Job = {
  id: string;
  name: string;
  agent: string;
  method: string;
  url: string;
  cron: string;
  payload: string;
  status: JobStatus;
  headersKV: HeaderKV[];
  headersJSON: string;
  headerMode: "kv" | "json";
  lastRun: string;
};

// Initial Data
const initialJobs: Job[] = [
  {
    id: "6a511629",
    name: "RSPG Health Check",
    agent: "Postman",
    method: "GET",
    url: "https://rspg-api.onrender.com/health",
    cron: "*/15 * * * *",
    payload: "",
    status: "Active",
    headerMode: "kv",
    headersJSON: "",
    headersKV: [
      { id: "1", key: "Content-Type", value: "application/json", enabled: true },
      { id: "2", key: "Accept", value: "application/json", enabled: true }
    ],
    lastRun: "3 hours ago"
  }
];

// Custom Select Component for Premium UI
const CustomSelect = ({ 
  label, 
  value, 
  onChange, 
  options 
}: { 
  label: string, 
  value: string, 
  onChange: (val: string) => void, 
  options: string[] 
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-[9px] sm:text-[10px] font-medium text-muted mb-1.5 uppercase tracking-wide">{label}</label>
      <div 
        className="input-field w-full rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-white flex justify-between items-center cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <span>{value}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
      </div>
      
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#161616] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
            {options.map(opt => (
              <div 
                key={opt} 
                className={`px-3 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors ${opt === value ? 'bg-white/10 text-white font-medium' : 'text-neutral-300 hover:bg-white/5 hover:text-white'}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function ChronydPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  
  // Shared Form State (Used for both Create and Edit)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [agent, setAgent] = useState("Postman");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [cron, setCron] = useState("*/5 * * * *");
  const [payload, setPayload] = useState("");
  
  // Headers State
  const [headerMode, setHeaderMode] = useState<"kv" | "json">("kv");
  const [headersKV, setHeadersKV] = useState<HeaderKV[]>([
    { id: Date.now().toString(), key: "Content-Type", value: "application/json", enabled: true }
  ]);
  const [headersJSON, setHeadersJSON] = useState("");

  // Modal State
  const [detailedJob, setDetailedJob] = useState<Job | null>(null);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [isModalEditing, setIsModalEditing] = useState(false);

  // Handlers
  const handleHeaderModeSwitch = (mode: "kv" | "json") => {
    if (mode === headerMode) return;
    
    if (mode === "json") {
      const jsonObj: Record<string, string> = {};
      headersKV.filter(h => h.enabled && h.key).forEach(h => {
        jsonObj[h.key] = h.value;
      });
      setHeadersJSON(Object.keys(jsonObj).length > 0 ? JSON.stringify(jsonObj, null, 2) : "");
    } else {
      try {
        if (!headersJSON.trim()) throw new Error("empty");
        const parsed = JSON.parse(headersJSON);
        const newKV: HeaderKV[] = Object.entries(parsed).map(([k, v]) => ({
          id: Math.random().toString(36).substr(2, 8),
          key: k,
          value: String(v),
          enabled: true
        }));
        if (newKV.length === 0) throw new Error("empty");
        setHeadersKV(newKV);
      } catch (e) {
        // Fallback to empty default if parsing fails
        setHeadersKV([{ id: Date.now().toString(), key: "", value: "", enabled: true }]);
      }
    }
    setHeaderMode(mode);
  };

  const addKVHeader = () => {
    setHeadersKV([...headersKV, { id: Date.now().toString(), key: "", value: "", enabled: true }]);
  };

  const removeKVHeader = (id: string) => {
    setHeadersKV(headersKV.filter(h => h.id !== id));
  };

  const updateKVHeader = (id: string, field: keyof HeaderKV, value: string | boolean) => {
    setHeadersKV(headersKV.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setAgent("Postman");
    setMethod("GET");
    setUrl("");
    setCron("*/5 * * * *");
    setPayload("");
    setHeaderMode("kv");
    setHeadersKV([{ id: Date.now().toString(), key: "Content-Type", value: "application/json", enabled: true }]);
    setHeadersJSON("");
  };

  const handleEdit = (job: Job) => {
    setEditingId(job.id);
    setName(job.name);
    setAgent(job.agent);
    setMethod(job.method);
    setUrl(job.url);
    setCron(job.cron);
    setPayload(job.payload);
    setHeaderMode(job.headerMode);
    setHeadersKV(job.headersKV);
    setHeadersJSON(job.headersJSON);
  };

  const handleSubmit = (e: React.FormEvent, isEdit: boolean) => {
    e.preventDefault();
    if (!name || !url) return;

    const newJob: Job = {
      id: isEdit && editingId ? editingId : Math.random().toString(36).substr(2, 8),
      name,
      agent,
      method,
      url,
      cron,
      payload,
      status: "Active",
      headerMode,
      headersKV,
      headersJSON,
      lastRun: isEdit && detailedJob ? detailedJob.lastRun : "Never"
    };

    if (isEdit && editingId) {
      const updatedJobs = jobs.map(j => j.id === editingId ? newJob : j);
      setJobs(updatedJobs);
      setDetailedJob(newJob);
      setIsModalEditing(false); // Return to read-only view in modal
    } else {
      setJobs([newJob, ...jobs]);
      resetForm();
    }
  };

  const toggleStatus = (id: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: j.status === "Active" ? "Paused" : "Active" } : j));
    if (detailedJob && detailedJob.id === id) {
      setDetailedJob({ ...detailedJob, status: detailedJob.status === "Active" ? "Paused" : "Active" });
    }
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(jobs.filter(j => j.id !== jobToDelete.id));
      if (detailedJob?.id === jobToDelete.id) {
        setDetailedJob(null);
        setIsModalEditing(false);
      }
      setJobToDelete(null);
    }
  };

  // Reusable Form Component
  const renderJobForm = (isEdit: boolean) => (
    <form onSubmit={(e) => handleSubmit(e, isEdit)} className="space-y-4 sm:space-y-5">
      {/* Name */}
      <div>
          <label className="block text-[9px] sm:text-[10px] font-medium text-muted mb-1 sm:mb-1.5 uppercase tracking-wide">Job Name</label>
          <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Health Check Sync" className="input-field w-full rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-white placeholder:text-muted/50" />
      </div>

      {/* Agent & Method */}
      <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
              <CustomSelect 
                  label="Agent" 
                  value={agent} 
                  onChange={setAgent} 
                  options={["Postman", "Curl", "Browser"]} 
              />
          </div>
          <div className="w-full sm:w-28 shrink-0">
              <CustomSelect 
                  label="Method" 
                  value={method} 
                  onChange={setMethod} 
                  options={["GET", "POST", "PUT", "PATCH", "DELETE"]} 
              />
          </div>
      </div>

      {/* Target URL */}
      <div>
          <label className="block text-[9px] sm:text-[10px] font-medium text-muted mb-1 sm:mb-1.5 uppercase tracking-wide">Target URL</label>
          <input required type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/sync" className="input-field w-full rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-white placeholder:text-muted/50" />
      </div>

      {/* Cron Expression */}
      <div>
          <label className="block text-[9px] sm:text-[10px] font-medium text-muted mb-1 sm:mb-1.5 uppercase tracking-wide flex items-center gap-2">
              Cron Schedule
          </label>
          <input required type="text" value={cron} onChange={e => setCron(e.target.value)} placeholder="*/5 * * * *" className="input-field w-full rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-white font-mono placeholder:text-muted/50" />
      </div>

      {/* Tabs for Headers */}
      <div>
          <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[9px] sm:text-[10px] font-medium text-muted uppercase tracking-wide">Headers</label>
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-white/5">
                  <button type="button" onClick={() => handleHeaderModeSwitch("kv")} className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-md transition-colors ${headerMode === "kv" ? "bg-white/10 text-white" : "text-muted hover:text-white"}`}>Key-Value</button>
                  <button type="button" onClick={() => handleHeaderModeSwitch("json")} className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-md transition-colors ${headerMode === "json" ? "bg-white/10 text-white" : "text-muted hover:text-white"}`}>JSON</button>
              </div>
          </div>
          
          {headerMode === "kv" ? (
            <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-xs text-muted leading-tight">Headers will be included in the request</p>
                    <button type="button" onClick={addKVHeader} className="text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Add Header
                    </button>
                </div>
                
                {headersKV.map(h => (
                  <div key={h.id} className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] p-2 rounded-xl">
                      <input type="text" value={h.key} onChange={e => updateKVHeader(h.id, 'key', e.target.value)} placeholder="Key" className="input-field w-1/3 min-w-[60px] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-muted/50" />
                      <input type="text" value={h.value} onChange={e => updateKVHeader(h.id, 'value', e.target.value)} placeholder="Value" className="input-field flex-1 min-w-[60px] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-muted/50" />
                      <div className="flex items-center gap-2 shrink-0 pl-1">
                          <label className="flex items-center cursor-pointer">
                              <input type="checkbox" checked={h.enabled} onChange={e => updateKVHeader(h.id, 'enabled', e.target.checked)} className="rounded border-white/20 bg-black/50 text-blue-500 focus:ring-blue-500 w-4 h-4 cursor-pointer" />
                          </label>
                          <button type="button" onClick={() => removeKVHeader(h.id)} className="text-red-400/70 hover:text-red-400 p-1 transition-colors">
                              <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="pt-2">
                <textarea rows={4} value={headersJSON} onChange={e => setHeadersJSON(e.target.value)} placeholder='{"Authorization": "Bearer token..."}' className="input-field w-full rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-white font-mono placeholder:text-muted/50 resize-none custom-scrollbar"></textarea>
            </div>
          )}
      </div>

      {/* Payload */}
      <div className="pt-2">
          <label className="block text-[9px] sm:text-[10px] font-medium text-muted mb-1 sm:mb-1.5 uppercase tracking-wide">Body Payload (Optional JSON)</label>
          <textarea rows={3} value={payload} onChange={e => setPayload(e.target.value)} placeholder='{"action": "sync", "force": true}' className="input-field w-full rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-white font-mono placeholder:text-muted/50 resize-none custom-scrollbar"></textarea>
      </div>

      {/* Submit Footer */}
      <div className="pt-3 sm:pt-4 border-t border-white/5">
          <button type="submit" className={`w-full font-semibold rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 ${isEdit ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white text-black hover:bg-neutral-200'}`}>
              {isEdit ? <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              {isEdit ? "Save Changes" : "Schedule Job"}
          </button>
      </div>
    </form>
  );

  return (
    <div className="max-w-[1400px] mx-auto pb-24">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
          <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Chronyd Tasks</h1>
              <p className="text-muted text-lg max-w-2xl">Automate your API calls with precise cron expressions.</p>
          </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Create Form (5 columns) */}
          <div className="lg:col-span-5">
              <div className="glass-card rounded-[24px] p-6 lg:p-8 lg:sticky lg:top-8">
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                          <PlusCircle className="w-5 h-5 text-blue-400" />
                          Create New Job
                      </h2>
                  </div>
                  
                  {renderJobForm(false)}
              </div>
          </div>

          {/* Right Column: Active Jobs (7 columns) */}
          <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Active Jobs ({jobs.length})</h2>
              </div>
              
              <div className="space-y-4">
                  {jobs.length === 0 ? (
                    <div className="glass-card rounded-2xl p-8 text-center">
                        <p className="text-muted text-sm">No active jobs found. Create one to get started.</p>
                    </div>
                  ) : jobs.map(job => (
                    <div key={job.id} className={`glass-card rounded-2xl p-4 sm:p-5 border-l-2 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${job.status === 'Active' ? 'border-l-orange-500' : 'border-l-neutral-600 opacity-60'}`}>
                      
                      {/* Left Info Section */}
                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${job.status === 'Active' ? 'bg-orange-500 animate-pulse' : 'bg-neutral-500'}`}></div>
                          <h3 className="text-lg font-bold text-white tracking-tight">{job.name}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${job.method === 'GET' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                            job.method === 'POST' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' :
                              job.method === 'DELETE' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                                'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                            }`}>{job.method}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-500/10 text-neutral-400'}`}>
                            {job.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors ml-4 sm:ml-5">
                          <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                          <a href={job.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline truncate max-w-[200px] sm:max-w-xs block">{job.url}</a>
                        </div>
                        <div className="flex items-center gap-2 mt-2 ml-4 sm:ml-5">
                          <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-muted font-mono shrink-0">{job.cron}</span>
                          <span className="text-xs text-muted shrink-0">•</span>
                          <span className="text-xs text-muted truncate">{job.agent}</span>
                        </div>
                      </div>

                      {/* Right Actions Section */}
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-4 sm:ml-0">
                        <button onClick={() => { setDetailedJob(job); setIsModalEditing(false); }} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted hover:text-white transition-colors" title="Detailed View">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setDetailedJob(job); handleEdit(job); setIsModalEditing(true); }} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted hover:text-white transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleStatus(job.id)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted hover:text-white transition-colors" title={job.status === 'Active' ? "Pause" : "Resume"}>
                          {job.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setJobToDelete(job)} className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Detailed View / Edit Modal */}
      {detailedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 shrink-0 bg-[#0a0a0a] z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 flex-1 min-w-0 pr-2">
                <h2 className="text-base sm:text-lg font-semibold text-white leading-tight">
                  {isModalEditing ? 'Edit Job: ' : ''}<span className={isModalEditing ? 'text-white/80' : ''}>{detailedJob.name}</span>
                </h2>
                {!isModalEditing && (
                  <span className={`w-max px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${detailedJob.method === 'GET' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                    detailedJob.method === 'POST' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' :
                      detailedJob.method === 'DELETE' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                        'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                    }`}>{detailedJob.method}</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 pt-0.5 sm:pt-0">
                {!isModalEditing ? (
                  <>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-sm">
                      <Play className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Run Now</span>
                    </button>
                    <button onClick={() => { handleEdit(detailedJob); setIsModalEditing(true); }} className="bg-white/5 hover:bg-white/10 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0">
                      <Pencil className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Edit Job</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setIsModalEditing(false); resetForm(); }} className="bg-white/5 hover:bg-white/10 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center transition-colors shrink-0 whitespace-nowrap">
                    Cancel
                  </button>
                )}
                <div className="w-px h-4 bg-white/10 mx-0.5 sm:mx-1 hidden sm:block"></div>
                <button onClick={() => { setDetailedJob(null); setIsModalEditing(false); resetForm(); }} className="text-muted hover:text-white p-1 transition-colors shrink-0">
                  <X className="w-5 h-5 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
              {isModalEditing ? (
                // EDIT MODE
                <div className="max-w-xl mx-auto py-4">
                  {renderJobForm(true)}
                </div>
              ) : (
                // VIEW MODE
                <>
                  {/* Sleek Minimalist Details */}
                  <div className="mb-6">
                    <p className="text-[10px] text-muted mb-1.5 uppercase tracking-wide pl-1">Target Endpoint</p>
                    <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3.5 rounded-xl">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold shrink-0 ${detailedJob.method === 'GET' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                        detailedJob.method === 'POST' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' :
                          detailedJob.method === 'DELETE' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                            'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                        }`}>{detailedJob.method}</span>
                      <a href={detailedJob.url} target="_blank" rel="noreferrer" className="font-mono text-sm text-blue-400 hover:text-blue-300 truncate block">{detailedJob.url}</a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 px-1">
                    <div>
                      <p className="text-[10px] text-muted mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                        <Clock className="w-3 h-3 shrink-0" /> Schedule
                      </p>
                      <p className="text-sm font-semibold text-white">{detailedJob.cron}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 shrink-0" /> Agent
                      </p>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${detailedJob.status === 'Active' ? 'bg-orange-500' : 'bg-neutral-500'}`}></div>
                        <p className="text-sm font-semibold text-white truncate">{detailedJob.agent}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                        <Hash className="w-3 h-3 shrink-0" /> Job ID
                      </p>
                      <p className="text-sm font-mono text-white truncate">{detailedJob.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0" /> Last Run
                      </p>
                      <p className="text-sm font-semibold text-emerald-400 truncate">{detailedJob.lastRun}</p>
                    </div>
                  </div>

                  <div className="mb-8 px-1">
                    <p className="text-[10px] text-muted mb-2.5 uppercase tracking-wide">Request Headers</p>
                    <div className="bg-black/50 border border-white/5 rounded-xl p-4 font-mono text-xs overflow-x-auto custom-scrollbar">
                      {detailedJob.headerMode === 'kv' ? (
                        <>
                          <div className="text-white">{"{"}</div>
                          {detailedJob.headersKV.filter(h => h.enabled && h.key).map((h, i, arr) => (
                            <div key={h.id} className="ml-4">
                              <span className="text-blue-300">&quot;{h.key}&quot;</span><span className="text-white">: </span><span className="text-green-400">&quot;{h.value}&quot;</span><span className="text-white">{i < arr.length - 1 ? ',' : ''}</span>
                            </div>
                          ))}
                          <div className="text-white">{"}"}</div>
                        </>
                      ) : (
                        <pre className="text-green-400">{detailedJob.headersJSON || "{}"}</pre>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <h3 className="text-sm font-semibold text-white">Execution Logs</h3>
                      <button className="text-[10px] text-muted hover:text-white uppercase tracking-wide flex items-center gap-1 transition-colors">
                        <RefreshCw className="w-3 h-3" /> Refresh
                      </button>
                    </div>
                    <div className="bg-black border border-white/10 rounded-xl p-4 h-64 overflow-y-auto font-mono text-xs space-y-2 custom-scrollbar">
                      {detailedJob.lastRun !== 'Never' ? (
                        <>
                          <div className="text-green-400">[2026-07-11 14:00:00] SUCCESS: 200 OK - Response Time: 124ms</div>
                          <div className="text-muted">{`{ "status": "healthy", "uptime": 342991 }`}</div>
                          <div className="border-b border-white/5 my-2"></div>
                          <div className="text-green-400">[2026-07-11 13:45:00] SUCCESS: 200 OK - Response Time: 110ms</div>
                          <div className="text-muted">{`{ "status": "healthy", "uptime": 342091 }`}</div>
                        </>
                      ) : (
                        <div className="text-muted opacity-50 italic">Waiting for first execution...</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 mx-auto border border-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-white text-center mb-2">Delete Job?</h2>
            <p className="text-sm text-muted text-center mb-6">Are you sure you want to permanently delete the &quot;{jobToDelete.name}&quot; scheduled task? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setJobToDelete(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl px-4 py-2 text-sm transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl px-4 py-2 text-sm transition-colors">Delete Job</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
