"use client";

import Link from "next/link";
import { Command, ArrowRight, ShieldAlert, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RequestAccessPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Admin access request submitted!");
    router.push("/");
  };

  return (
    <div 
      className="antialiased min-h-screen flex flex-col items-center justify-center selection:bg-white/20 p-4 py-12 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
        `
      }}
    >
      {/* Back to Home */}
      <div className="w-full max-w-[500px] mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Auth Card */}
      <div className="auth-card w-full max-w-[500px] rounded-[24px] p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Request Admin Access</h1>
          <p className="text-sm text-muted">Request elevated permissions from the system administrator to manage internal tooling.</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-primary/80 uppercase tracking-wider">First Name</label>
              <input 
                type="text" 
                required
                className="input-field w-full px-4 py-2.5 rounded-lg text-sm text-primary placeholder:text-muted/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-primary/80 uppercase tracking-wider">Last Name</label>
              <input 
                type="text" 
                required
                className="input-field w-full px-4 py-2.5 rounded-lg text-sm text-primary placeholder:text-muted/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-primary/80 uppercase tracking-wider">Internal Employee Email</label>
            <input 
              type="email" 
              placeholder="name@internal.company.com" 
              required
              className="input-field w-full px-4 py-2.5 rounded-lg text-sm text-primary placeholder:text-muted/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-primary/80 uppercase tracking-wider">Department / Team</label>
            <input 
              type="text" 
              placeholder="e.g. Infrastructure, Security" 
              required
              className="input-field w-full px-4 py-2.5 rounded-lg text-sm text-primary placeholder:text-muted/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-primary/80 uppercase tracking-wider">Reason for Access</label>
            <textarea 
              placeholder="Describe why you need administrative control over the utilities..." 
              required
              rows={3}
              className="input-field w-full px-4 py-2.5 rounded-lg text-sm text-primary placeholder:text-muted/50 resize-y"
            ></textarea>
          </div>

          <button type="submit" className="primary-btn w-full py-3 rounded-lg font-bold text-sm mt-4 flex items-center justify-center gap-2">
            Submit Request
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-sm text-muted">
            Already have admin privileges?{" "}
            <Link href="/login" className="text-white font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
