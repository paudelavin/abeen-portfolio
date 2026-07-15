import { profile } from "@/lib/resume-data";
import { NepaliDateTime } from "@/components/NepaliDateTime";
import { VisitCounter } from "@/components/VisitCounter";

export function Footer() {
  return (
    <footer className="border-t border-ink-600/60 mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-ink-400 font-mono text-xs">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <div className="flex gap-4">
            <a href={`mailto:${profile.email}`} className="hover:text-amber transition-colors">
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 pt-4 border-t border-ink-600/40">
          <NepaliDateTime />
          <VisitCounter />
        </div>
      </div>
    </footer>
  );
}