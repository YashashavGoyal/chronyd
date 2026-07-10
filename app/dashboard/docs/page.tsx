import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Key, Hash, Code2, Terminal } from "lucide-react";

export default function DashboardDocsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-16 pb-24">
      
      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide">
          <BookOpen className="w-3.5 h-3.5" />
          Documentation
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome to Utiqx</h1>
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          Utiqx is a meticulously crafted suite of developer utilities designed for speed, security, and local execution. Everything you need to automate workflows and handle sensitive data formats.
        </p>
      </header>

      {/* Quick Start Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight border-b border-white/5 pb-4">Explore the Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <Link href="/dashboard/cron" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">URL Scheduler</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">Schedule exact HTTP requests using full cron expressions, custom headers, and monitor webhook delivery rates.</p>
            <div className="flex items-center text-xs font-semibold text-blue-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link href="/dashboard/jwt" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-emerald-400 transition-colors">JWT Generator</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">Encode and decode JSON Web Tokens entirely locally. Perfect for testing authentication middleware securely.</p>
            <div className="flex items-center text-xs font-semibold text-emerald-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link href="/dashboard/bcrypt" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Hash className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">Password Hasher</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">Hash passwords and compare hashes on the fly with configurable salt rounds. Vital for database seeding.</p>
            <div className="flex items-center text-xs font-semibold text-purple-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link href="/dashboard/data" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-amber-400 transition-colors">JSON Formatter</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">Format complex JSON payloads, convert to YAML, and validate schemas without pasting into random websites.</p>
            <div className="flex items-center text-xs font-semibold text-amber-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link href="/dashboard/base64" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-indigo-400 transition-colors">Base64 Converter</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">Quickly encode strings to base64 or decode authorization headers seamlessly on your local machine.</p>
            <div className="flex items-center text-xs font-semibold text-indigo-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

        </div>
      </section>

      {/* Security Notice */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight border-b border-white/5 pb-4">Security Architecture</h2>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/5 border border-red-500/20">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-500/20 rounded-lg text-red-400 mt-1">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-red-100 mb-2">100% Client-Side Execution</h4>
              <p className="text-sm text-red-200/70 leading-relaxed">
                With the exception of the Automations (Cron Jobs) engine which requires server-side scheduling, <strong>all hashing, JWT generation, and JSON formatting happens entirely in your local browser memory</strong>. We do not store, log, or transmit your sensitive payloads, JWT secrets, or plain-text passwords.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
