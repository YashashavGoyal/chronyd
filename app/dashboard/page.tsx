import Link from "next/link";
import { Clock, Activity, Key, Hash, Code2, Binary } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Welcome to Utiqx</h1>
        <p className="text-muted text-lg max-w-2xl">Your centralized hub for developer utilities. Select a tool below to get started.</p>
      </div>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* URL Scheduler Card (Large) */}
        <Link href="/dashboard/chronyd" className="glass-card rounded-[20px] p-6 flex flex-col group md:col-span-2 relative overflow-hidden">
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              3 Active Tasks
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">URL Scheduler</h3>
            <p className="text-muted text-sm leading-relaxed max-w-md">Automate API calls, test endpoints, and monitor uptime with precision cron jobs and custom headers.</p>
          </div>
          
          {/* Decorative graphical element */}
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
            <Activity className="w-64 h-64 text-white" />
          </div>
        </Link>

        {/* JWT Generator Card */}
        <Link href="/dashboard/jwt" className="glass-card rounded-[20px] p-6 flex flex-col group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Key className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">JWT Generator</h3>
            <p className="text-muted text-sm leading-relaxed">Sign and verify JSON Web Tokens instantly for testing authentication.</p>
          </div>
        </Link>

        {/* Password Hasher Card */}
        <Link href="/dashboard/bcrypt" className="glass-card rounded-[20px] p-6 flex flex-col group relative overflow-hidden">
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Hash className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-purple-400 transition-colors">Password Hasher</h3>
            <p className="text-muted text-sm leading-relaxed">Generate secure bcrypt hashes to manually seed testing databases.</p>
          </div>
        </Link>

        {/* JSON Formatter Card */}
        <Link href="/dashboard/data" className="glass-card rounded-[20px] p-6 flex flex-col group relative overflow-hidden">
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">JSON Formatter</h3>
            <p className="text-muted text-sm leading-relaxed">Format, validate, and minify complex JSON payloads securely locally.</p>
          </div>
        </Link>

        {/* Base64 Converter Card */}
        <Link href="/dashboard/base64" className="glass-card rounded-[20px] p-6 flex flex-col group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Binary className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">Base64 Converter</h3>
            <p className="text-muted text-sm leading-relaxed">Quickly encode strings to base64 or decode authorization headers.</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
