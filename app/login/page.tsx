"use client";

import Link from "next/link";
import { Command, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    document.cookie = "utiqx_auth=true; path=/";
    router.push("/dashboard");
  };

  return (
    <div 
      className="antialiased min-h-screen flex flex-col items-center justify-center selection:bg-white/20 p-4 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% -20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 120%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
        `
      }}
    >
      {/* Back to Home */}
      <div className="w-full max-w-[400px] mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Auth Card */}
      <div className="auth-card w-full max-w-[400px] rounded-[24px] p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-sm text-muted">Enter your credentials to access your utilities.</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-primary/80 uppercase tracking-wider">Email address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              required
              className="input-field w-full px-4 py-2.5 rounded-lg text-sm text-primary placeholder:text-muted/50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-primary/80 uppercase tracking-wider">Password</label>
              <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              className="input-field w-full px-4 py-2.5 rounded-lg text-sm text-primary placeholder:text-muted/50"
            />
          </div>

          <button type="submit" className="primary-btn w-full py-2.5 rounded-lg font-semibold text-sm mt-2 flex items-center justify-center gap-2">
            Sign In
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-sm text-muted">
            Don't have an account?{" "}
            <Link href="/request-access" className="text-white font-medium hover:underline">Request access</Link>
          </p>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-8 flex items-center gap-2 text-xs text-muted/60">
        <ShieldCheck className="w-4 h-4" />
        Secure, end-to-end encrypted authentication
      </div>
    </div>
  );
}
