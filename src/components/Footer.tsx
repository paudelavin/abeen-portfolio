import Link from "next/link";
import { RealVisitCounter } from "@/components/RealVisitCounter";

export function Footer() {
  return (
    <footer className="border-t border-ink-600/60 mt-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-ink-400">
          © {new Date().getFullYear()} Abeen Poudel. All rights reserved.
        </p>
        <div className="flex items-center gap-4 font-mono text-xs text-ink-400">
          <RealVisitCounter />
          <Link href="/contact" className="hover:text-amber transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}