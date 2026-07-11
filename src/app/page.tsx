import Link from "next/link";
import { profile, skills, certifications } from "@/lib/resume-data";
import { KanbanHero } from "@/components/KanbanHero";
import { TicketLabel } from "@/components/TicketLabel";
import { Reveal } from "@/components/Reveal";
import { SkillBar } from "@/components/SkillBar";
import { CertBadge } from "@/components/CertBadge";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8">
      {/* Hero: looks like an open ticket */}
      <section className="pt-14 sm:pt-20 pb-12">
        <TicketLabel id="POUDEL-01" status="in-progress" />
        <h1 className="font-display text-4xl sm:text-6xl text-paper mt-5 leading-[1.05] tracking-tight">
          {profile.name}
        </h1>
        <p className="font-mono text-sm sm:text-base text-amber mt-3">{profile.title}</p>
        <p className="text-ink-400 text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
          {profile.tagline}
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/resume"
            className="bg-amber text-ink-900 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded hover:bg-amber-600 transition-colors"
          >
            View Resume
          </Link>
          <Link
            href="/contact"
            className="border border-ink-600 text-paper font-mono text-xs uppercase tracking-wider px-5 py-3 rounded hover:border-amber hover:text-amber transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Signature: kanban board of the career */}
      <section className="pb-16">
        <KanbanHero />
      </section>

      {/* Summary */}
      <Reveal>
        <section className="pb-16 border-t border-ink-600/60 pt-12">
          <TicketLabel id="POUDEL-02" status="done" />
          <h2 className="font-display text-2xl text-paper mt-4 mb-4">About</h2>
          <p className="text-ink-400 leading-relaxed max-w-3xl">{profile.summary}</p>
        </section>
      </Reveal>

      {/* Skills */}
      <Reveal>
        <section className="pb-12">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-6">
            Top Skills
          </h3>
          <div className="flex flex-col gap-4 max-w-2xl">
            {skills.slice(0, 6).map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* Certifications */}
      <Reveal>
        <section className="pb-20">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-6">
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {certifications.map((c) => (
              <CertBadge key={c} name={c} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}