"use client";

import Link from "next/link";
import { Command, ArrowRight, Clock, Key, Hash, Code2, Menu, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="antialiased min-h-screen relative overflow-x-hidden selection:bg-white/20">
      <div className="hero-glow"></div>

      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 pt-28 md:pt-32 pb-16 md:pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6 md:mb-8 tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            Utiqx v2.0 is now live
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 leading-tight">
            The ultimate toolkit <br className="hidden md:block" /> for modern
            developers.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 sm:px-0">
            API request scheduling, JWT generation, advanced hashing, and API monitoring
            unified in one breathtakingly fast, secure interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link
              href="/login"
              className="primary-btn px-8 py-3.5 md:py-3 rounded-full font-semibold text-sm w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/features"
              className="glass-btn px-8 py-3.5 md:py-3 rounded-full font-medium text-sm w-full sm:w-auto text-primary text-center"
            >
              Read the Features
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-relaxed py-2 mb-3 md:mb-4">
            Everything you need, nothing you don&apos;t.
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0">
            A meticulously crafted suite of tools designed to remove friction
            from your daily workflow.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large Card: Automations */}
          <div className="feature-card p-6 md:p-8 rounded-[20px] md:rounded-[24px] md:col-span-2 md:row-span-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <div className="mt-auto pt-12 md:pt-0">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 tracking-tight">
                  Precision Automations
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-md">
                  Schedule highly precise HTTP requests with custom headers,
                  dynamic payloads, and complex cron expressions. Monitor the
                  success rate of your webhooks in real-time.
                </p>
              </div>
            </div>
            {/* Decorative Graphic */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Clock className="w-48 h-48 md:w-64 md:h-64 text-blue-400" />
            </div>
          </div>

          {/* Medium Card: JWT */}
          <div className="feature-card p-6 md:p-8 rounded-[20px] md:rounded-[24px] md:col-span-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                  <Key className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 tracking-tight">
                  Security Tokens
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-sm">
                  Instantly generate and decode JWTs with custom secrets to test
                  your authentication middlewares securely without leaving your tab.
                </p>
              </div>
            </div>
            {/* Decorative Graphic */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.07] group-hover:opacity-20 transition-opacity pointer-events-none">
              <Key className="w-40 h-40 md:w-56 md:h-56 text-emerald-400" />
            </div>
          </div>

          {/* Small Card: Password Hasher */}
          <div className="feature-card p-5 md:p-6 rounded-[20px] md:rounded-[24px] md:col-span-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Hash className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 tracking-tight">
                  Bcrypt Hasher
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Generate robust database seed passwords on the fly with adjustable rounds.
                </p>
              </div>
            </div>
            {/* Decorative Graphic */}
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Hash className="w-24 h-24 md:w-32 md:h-32 text-purple-400" />
            </div>
          </div>

          {/* Small Card: Data Formats */}
          <div className="feature-card p-5 md:p-6 rounded-[20px] md:rounded-[24px] md:col-span-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 tracking-tight">
                  Data Utilities
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Format JSON, parse YAML, and encode Base64 streams entirely locally.
                </p>
              </div>
            </div>
            {/* Decorative Graphic */}
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Code2 className="w-24 h-24 md:w-32 md:h-32 text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 md:py-32 px-6 border-t border-white/[0.02] bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 leading-tight">Ready to upgrade your workflow?</h2>
          <p className="text-muted text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">Join thousands of elite developers who have replaced their fragmented tooling with one unified interface.</p>
          <Link
            href="/request-access"
            className="primary-btn inline-flex px-8 py-4 rounded-full font-bold text-sm md:text-base items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] w-full sm:w-auto"
          >
            Request Early Access
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}