"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/posts", label: "Posts" },
    { href: "/admin/comments", label: "Comments" },
    { href: "/admin/messages", label: "Messages" },
  ];

  return (
    <div className="border-b border-ink-600/60 bg-ink-600/20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-wider text-ink-400 hover:text-amber px-3 py-1.5 rounded hover:bg-ink-600/50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="font-mono text-[11px] uppercase tracking-wider text-ink-400 hover:text-amber transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
