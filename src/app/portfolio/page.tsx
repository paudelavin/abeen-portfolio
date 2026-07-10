import { caseStudies } from "@/lib/resume-data";
import { TicketLabel } from "@/components/TicketLabel";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "Portfolio — Abeen Poudel" };

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <TicketLabel id="POUDEL-04" status="done" />
      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4">Portfolio</h1>
      <p className="text-ink-400 mt-3 max-w-2xl leading-relaxed">
        Since my work centers on product and delivery rather than shipping personal side
        projects, these are the initiatives I&apos;ve led — framed the way I&apos;d present
        them in a sprint review.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mt-12">
        {caseStudies.map((cs, index) => (
          <Reveal key={cs.id} delay={index * 80}>
          <article
            className="border border-ink-600/70 rounded-lg p-6 bg-ink-600/20 flex flex-col card-hover"
          >
            <TicketLabel id={cs.id} status="done" />
            <h2 className="font-display text-xl text-paper mt-4">{cs.title}</h2>
            <p className="font-mono text-xs text-amber mt-1">{cs.tag}</p>
            <p className="text-ink-400 text-sm mt-4 leading-relaxed">{cs.summary}</p>
            <div className="mt-5 pt-5 border-t border-ink-600/60">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-400 mb-3">
                Outcomes
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
          </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
