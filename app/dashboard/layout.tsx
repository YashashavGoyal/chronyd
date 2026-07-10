"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Command, 
  LayoutGrid,
  Clock, 
  Activity,
  Key, 
  Hash, 
  Code2, 
  Binary,
  Search,
  ChevronRight,
  ChevronsUpDown,
  BookOpen,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "utiqx_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border/50 shrink-0">
          <Link href="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <Command className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold tracking-tight text-lg">Utiqx</span>
          </Link>
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          
          {/* Category: Overview */}
          <div>
              <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Overview</p>
              <div className="space-y-1">
                  <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className={`nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === "/dashboard" ? "active" : "text-muted group"}`}>
                      <LayoutGrid className={`w-4 h-4 ${pathname === "/dashboard" ? "text-primary" : "text-muted group-hover:text-primary transition-colors"}`} />
                      Dashboard
                  </Link>
                  <Link href="/dashboard/docs" onClick={() => setIsMobileOpen(false)} className={`nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === "/dashboard/docs" ? "active" : "text-muted group"}`}>
                      <BookOpen className={`w-4 h-4 ${pathname === "/dashboard/docs" ? "text-primary" : "text-muted group-hover:text-primary transition-colors"}`} />
                      Docs
                  </Link>
              </div>
          </div>

          {/* Category: Automations */}
          <div>
              <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Automations</p>
              <div className="space-y-1">
                  <Link href="/dashboard/cron" onClick={() => setIsMobileOpen(false)} className={`nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === "/dashboard/cron" ? "active" : "text-muted group"}`}>
                      <Clock className={`w-4 h-4 ${pathname === "/dashboard/cron" ? "text-primary" : "text-muted group-hover:text-primary transition-colors"}`} />
                      URL Scheduler
                  </Link>
                  <div className="nav-item flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted font-medium group pointer-events-none opacity-50">
                      <div className="flex items-center gap-3">
                          <Activity className="w-4 h-4 text-muted" />
                          API Monitors
                      </div>
                      <span className="text-[10px] py-0.5 px-2 bg-white/5 border border-white/10 rounded-full text-muted">Soon</span>
                  </div>
              </div>
          </div>

          {/* Category: Security */}
          <div>
              <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Security</p>
              <div className="space-y-1">
                  <Link href="/dashboard/jwt" onClick={() => setIsMobileOpen(false)} className={`nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === "/dashboard/jwt" ? "active" : "text-muted group"}`}>
                      <Key className={`w-4 h-4 ${pathname === "/dashboard/jwt" ? "text-primary" : "text-muted group-hover:text-primary transition-colors"}`} />
                      JWT Generator
                  </Link>
                  <Link href="/dashboard/bcrypt" onClick={() => setIsMobileOpen(false)} className={`nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === "/dashboard/bcrypt" ? "active" : "text-muted group"}`}>
                      <Hash className={`w-4 h-4 ${pathname === "/dashboard/bcrypt" ? "text-primary" : "text-muted group-hover:text-primary transition-colors"}`} />
                      Password Hasher
                  </Link>
              </div>
          </div>
          
          {/* Category: Dev Tools */}
          <div>
              <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Dev Tools</p>
              <div className="space-y-1">
                  <Link href="/dashboard/data" onClick={() => setIsMobileOpen(false)} className={`nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === "/dashboard/data" ? "active" : "text-muted group"}`}>
                      <Code2 className={`w-4 h-4 ${pathname === "/dashboard/data" ? "text-primary" : "text-muted group-hover:text-primary transition-colors"}`} />
                      JSON Formatter
                  </Link>
                  <Link href="/dashboard/base64" onClick={() => setIsMobileOpen(false)} className={`nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${pathname === "/dashboard/base64" ? "active" : "text-muted group"}`}>
                      <Binary className={`w-4 h-4 ${pathname === "/dashboard/base64" ? "text-primary" : "text-muted group-hover:text-primary transition-colors"}`} />
                      Base64 Converter
                  </Link>
              </div>
          </div>

      </div>
      
      {/* User Profile */}
      <div className="p-4 border-t border-border/50 shrink-0">
          <div onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 border border-white/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">US</span>
              </div>
              <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-primary truncate">User Settings</p>
                  <p className="text-xs text-muted truncate group-hover:text-red-400 transition-colors">Sign out</p>
              </div>
              <ChevronsUpDown className="w-4 h-4 text-muted" />
          </div>
      </div>
    </>
  );

  return (
    <div className="antialiased h-screen flex overflow-hidden app-bg selection:bg-white/20 font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-black/50 backdrop-blur-xl flex-col h-full z-20 hidden md:flex">
          <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      >
        <aside 
          className={`absolute inset-y-0 left-0 w-64 bg-black/90 border-r border-white/5 flex flex-col h-full transition-transform duration-300 ease-out ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={e => e.stopPropagation()}
        >
          <SidebarContent />
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-white/[0.02] bg-transparent">
              <div className="flex items-center gap-4">
                  {/* Hamburger Menu (Mobile) */}
                  <button 
                    onClick={() => setIsMobileOpen(true)}
                    className="md:hidden p-2 -ml-2 text-muted hover:text-white transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>

                  {/* Breadcrumbs */}
                  <div className="hidden sm:flex items-center text-sm font-medium text-muted">
                      <span className="hover:text-primary cursor-pointer transition-colors">Overview</span>
                      <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
                      <span className="text-primary">{pathname === "/dashboard/docs" ? "Docs" : "Dashboard"}</span>
                  </div>
              </div>
              
              {/* Search & Actions */}
              <div className="flex items-center gap-4">
                  <div className="relative group">
                      <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                      <input type="text" placeholder="Search utilities... (⌘K)" className="w-full sm:w-64 bg-surface border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-muted/70 text-primary" />
                  </div>
              </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
              {children}
          </div>
      </main>

    </div>
  );
}
