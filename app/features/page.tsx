import Link from "next/link";
import { Command, ArrowRight, Clock, Key, Hash, Code2, ShieldCheck, Database, FileJson, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <div className="antialiased min-h-screen relative overflow-x-hidden selection:bg-white/20 pb-0">
      <div className="hero-glow"></div>

      <Navbar />

      {/* Hero Header */}
      <main className="relative z-10 pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 leading-tight">
            Every tool you need. <br /> None of the bloat.
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Take a deep dive into the purpose-built utilities that power modern developer workflows. Fully local, lightning fast, and exceptionally secure.
          </p>
        </div>
      </main>

      {/* Feature Showcase 1: Automations (Text Left, Graphic Right) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-2">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Precision Automations</h2>
            <p className="text-lg text-muted leading-relaxed">
              Ditch the complex external chron jobs. Schedule highly precise HTTP requests with custom headers and dynamic JSON payloads directly from your dashboard.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-blue-400" /> Full CRON expression support
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-blue-400" /> Real-time webhook success monitoring
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-blue-400" /> Custom Authorization headers
              </li>
            </ul>
          </div>
          
          <div className="flex-1 w-full relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[32px] blur opacity-20"></div>
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-6 mb-6">
                <span className="text-base font-bold text-white/80">New Job</span>
                <span className="text-sm font-semibold bg-[#111f3d] text-blue-400 px-3 py-1.5 rounded-lg tracking-widest">*/5 * * * *</span>
              </div>
              <div className="space-y-4">
                <div className="w-full bg-[#151515] rounded-xl border border-white/[0.03] p-4 flex items-center overflow-hidden shadow-inner">
                  <span className="text-blue-400 font-bold mr-3 text-base">POST</span>
                  <span className="text-white/50 truncate text-base">https://api.example.com/sync</span>
                </div>
                <div className="w-full bg-[#151515] rounded-xl border border-white/[0.03] p-5 flex flex-col font-mono text-emerald-400 text-sm leading-relaxed whitespace-pre shadow-inner">
                  <span>{"{  \"action\": \"sync\","}</span>
                  <span>{"   \"force\": true  }"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase 2: Security (Graphic Left, Text Right) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 w-full relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[32px] blur opacity-20"></div>
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 overflow-hidden h-full">
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Key className="w-8 h-8 text-emerald-400" />
                    <div>
                      <h4 className="font-semibold text-sm">JWT Generator</h4>
                      <p className="text-xs text-muted">HS256 / RS256 Encoding</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Hash className="w-8 h-8 text-purple-400" />
                    <div>
                      <h4 className="font-semibold text-sm">Bcrypt Hasher</h4>
                      <p className="text-xs text-muted">Configurable Salt Rounds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Lock className="w-8 h-8 text-red-400" />
                    <div>
                      <h4 className="font-semibold text-sm">Base64 Encoder</h4>
                      <p className="text-xs text-muted">Zero-dependency strings</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-2">
              <Key className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Security & Hashing</h2>
            <p className="text-lg text-muted leading-relaxed">
              Test your authentication middlewares securely. Instantly generate JWTs with custom secrets, or hash database seeds on the fly with adjustable Bcrypt rounds.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> 100% Client-side execution
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> No secrets sent to external servers
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Instant payload verification
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Feature Showcase 3: Data Utilities (Text Left, Graphic Right) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-2">
              <Code2 className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Data Utilities</h2>
            <p className="text-lg text-muted leading-relaxed">
              Stop pasting sensitive JSON into random web formatters. Our Data Utilities ensure your complex configurations stay entirely within your local environment.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-amber-400" /> JSON Formatting & Validation
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                <ShieldCheck className="w-5 h-5 text-amber-400" /> JSON to YAML Conversion
              </li>
            </ul>
          </div>
          
          <div className="flex-1 w-full relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-[32px] blur opacity-20"></div>
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 overflow-hidden h-64 flex items-center justify-center">
               <FileJson className="w-32 h-32 text-amber-400/20 absolute -right-4 -bottom-4" />
               <div className="bg-black/50 border border-white/10 rounded-xl p-6 w-full max-w-sm backdrop-blur-md relative z-10 shadow-2xl">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="font-mono text-xs text-white/70 space-y-2">
                    <p><span className="text-purple-400">"status"</span>: <span className="text-emerald-400">"success"</span>,</p>
                    <p><span className="text-purple-400">"data"</span>: {"{"}</p>
                    <p className="pl-4"><span className="text-purple-400">"parsed"</span>: <span className="text-blue-400">true</span></p>
                    <p>{"}"}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-24 text-center">
        <Link
          href="/request-access"
          className="primary-btn inline-flex px-8 py-4 rounded-full font-bold text-base items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
        >
          Request Admin Access
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
