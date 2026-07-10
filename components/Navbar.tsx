"use client";

import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-sm flex items-center justify-center">
            <Command className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" />
          </div>
          <span className="font-bold tracking-tight text-base sm:text-lg">Utiqx</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium text-muted hover:text-primary transition-colors">
            Features
          </Link>
          <div className="w-px h-4 bg-white/10"></div>
          <Link
            href="/login"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/request-access"
            className="text-sm font-semibold bg-white text-black px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Get Access
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -mr-2 text-muted hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Full Screen Slide-in Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Sliding Content */}
        <div
          className={`absolute inset-0 flex flex-col h-[100dvh] w-full bg-[#030303] transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <Command className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold tracking-tight text-xl">Utiqx</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col items-start justify-start space-y-6 p-6 mt-2">
            <Link href="/features" className="text-lg font-medium text-muted hover:text-white transition-colors">
              Features
            </Link>
            <div className="w-full h-px bg-white/10"></div>
            <Link href="/login" className="text-lg font-medium text-muted hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/request-access"
              className="mt-8 w-full text-center text-sm font-semibold bg-white text-black px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Get Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
