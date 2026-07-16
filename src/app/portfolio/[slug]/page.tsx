import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies } from "@/lib/resume-data";
import { TicketLabel } from "@/components/TicketLabel";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  return { title: cs ? `${cs.title} — Abeen Poudel` : "Case study not found" };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <Link
        href="/portfolio"
        className="font-mono text-xs text-ink-400 hover:text-amber transition-colors"
      >
        ← Back to Portfolio
      </Link>

      <div className="mt-6">
        <TicketLabel id={cs.id} status="done" />
        <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4">{cs.title}</h1>
        <p className="font-mono text-sm text-amber mt-2">{cs.tag}</p>
      </div>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-3">
          Situation
        </h2>
        <p className="text-ink-400 leading-relaxed">{cs.situation}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-3">
          What I Did
        </h2>
        <ul className="space-y-3">
          {cs.approach.map((point, i) => (
            <li key={i} className="text-ink-400 leading-relaxed flex gap-3">
              <span className="text-amber shrink-0 font-mono text-xs mt-1">{i + 1}.</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-3">
          Results
        </h2>
        <p className="text-ink-400 leading-relaxed">{cs.results}</p>
        <div className="mt-5 border border-ink-600/70 rounded-lg p-5 bg-ink-600/20">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-400 mb-3">
            Key Outcomes
          </p>
          <ul className="space-y-2">
            {cs.outcomes.map((o, i) => (
              <li key={i} className="text-paper text-sm flex gap-2">
                <span className="text-teal shrink-0">✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 pb-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-3">
          What I Learned
        </h2>
        <p className="text-ink-400 leading-relaxed italic">{cs.lessons}</p>
      </section>

      <div className="border-t border-ink-600/60 pt-8">
        <Link
          href="/portfolio"
          className="font-mono text-xs text-amber hover:underline"
        >
          ← Back to all case studies
        </Link>
      </div>
    </article>
  );
}