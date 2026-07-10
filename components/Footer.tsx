import Link from "next/link";
import { Command } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] pt-10 pb-20 md:pt-12 md:pb-24 px-6 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
              <Command className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-sm text-primary">
              Utiqx
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted">
            <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#" className="hover:text-primary transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 md:mt-0">
          <p className="text-xs text-muted/60 text-center">
            Designed for speed. Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
