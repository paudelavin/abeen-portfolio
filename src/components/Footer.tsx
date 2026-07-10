import { profile } from "@/lib/resume-data";

export function Footer() {
  return (
    <footer className="border-t border-ink-600/60 mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-ink-400 font-mono text-xs">
        <p>© {new Date().getFullYear()} {profile.name}. Shipped, not just planned.</p>
        <div className="flex gap-4">
          <a href={`mailto:${profile.email}`} className="hover:text-amber transition-colors">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
