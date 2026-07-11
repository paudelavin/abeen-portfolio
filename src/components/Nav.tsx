"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="border-b border-ink-600/60 sticky top-0 z-40 bg-ink/90 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg text-paper tracking-tight">
          Abeen Poudel
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link font-mono text-[11px] sm:text-xs uppercase tracking-wider text-ink-400 hover:text-amber transition-colors px-2 sm:px-3 py-1.5 rounded hover:bg-ink-600/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}