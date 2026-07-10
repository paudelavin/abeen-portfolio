import Link from "next/link";
import { profile, skills, certifications } from "@/lib/resume-data";
import Image from "next/image";
import { KanbanHero } from "@/components/KanbanHero";
import { TicketLabel } from "@/components/TicketLabel";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8">
      {/* Hero: looks like an open ticket */}
      <section className="pt-14 sm:pt-20 pb-12">
        <div className="flex-1">
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
        </div>
       {/* Profile photo — commented out for now, uncomment to bring back
       <div className="shrink-0">
          <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden">
            <Image
              src="/profile.jpg"
              alt={profile.name}
              width={176}
              height={176}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        */}
      </section>

      {/* Signature: kanban board of the career */}
      <section className="pb-16">
        <KanbanHero />
      </section>

      {/* Summary */}
      <section className="pb-16 border-t border-ink-600/60 pt-12">
        <TicketLabel id="POUDEL-02" status="done" />
        <h2 className="font-display text-2xl text-paper mt-4 mb-4">About</h2>
        <p className="text-ink-400 leading-relaxed max-w-3xl">{profile.summary}</p>
      </section>

      {/* Skills + Certifications */}
      <Reveal>
        <section className="pb-20 grid sm:grid-cols-2 gap-10">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[11px] text-paper bg-ink-600/50 border border-ink-600 rounded px-2.5 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-4">
              Certifications
            </h3>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-2 text-paper text-sm">
                  <span className="text-teal mt-0.5">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
