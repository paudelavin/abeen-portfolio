import { experience, education, skills, certifications, profile } from "@/lib/resume-data";
import { TicketLabel } from "@/components/TicketLabel";
import { SkillBar } from "@/components/SkillBar";
import { CertBadge } from "@/components/CertBadge";

export const metadata = { title: "Resume — Abeen Poudel" };

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <TicketLabel id="POUDEL-03" status="done" />
          <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4">Resume</h1>
          <p className="text-ink-400 mt-2">{profile.location} · {profile.phone}</p>
        </div>
        <a
          href="/resume.pdf"
          className="font-mono text-xs uppercase tracking-wider border border-ink-600 text-paper px-4 py-2.5 rounded hover:border-amber hover:text-amber transition-colors"
        >
          Download PDF
        </a>
      </div>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-6">
          Experience
        </h2>
        <div className="flex flex-col gap-6">
          {experience.map((role) => (
            <div
              key={role.id}
              className="border border-ink-600/70 rounded-lg p-5 sm:p-6 bg-ink-600/20 card-hover"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <TicketLabel id={role.id} status={role.status} />
                <span className="font-mono text-xs text-ink-400">{role.period}</span>
              </div>
              <h3 className="font-display text-xl text-paper">{role.title}</h3>
              <p className="font-mono text-sm text-amber mt-0.5">
                {role.company} · {role.location}
              </p>
              {role.points.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {role.points.map((point, i) => (
                    <li key={i} className="text-ink-400 text-sm leading-relaxed flex gap-2">
                      <span className="text-teal shrink-0">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-6">
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.school} className="border-l-2 border-teal pl-5">
            <h3 className="font-display text-lg text-paper">{edu.school}</h3>
            <p className="text-ink-400 text-sm mt-1">{edu.degree}</p>
            <p className="font-mono text-xs text-ink-400 mt-1">{edu.period}</p>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-6">
          Skills
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
          {skills.map((s) => (
            <SkillBar key={s.name} name={s.name} level={s.level} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-6">
          Certifications
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {certifications.map((c) => (
            <CertBadge key={c} name={c} />
          ))}
        </div>
      </section>
    </div>
  );
}