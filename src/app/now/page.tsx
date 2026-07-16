import { nowUpdates } from "@/lib/resume-data";
import { TicketLabel } from "@/components/TicketLabel";
import { NowIllustration } from "@/components/NowIllustration";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "Now — Abeen Poudel" };

export default function NowPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <TicketLabel id="POUDEL-NOW" status="in-progress" />
      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4">What I'm Doing Now</h1>
      <p className="text-ink-400 mt-3">
        A snapshot of where my focus is these days. Last updated {nowUpdates.lastUpdated}.
      </p>

      <div className="mt-10 flex flex-col gap-5">
        {nowUpdates.items.map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="border border-ink-600/70 rounded-lg p-5 bg-ink-600/20 card-hover flex items-center gap-5">
              <NowIllustration type={item.illustration} />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-amber mb-2">
                  {item.label}
                </p>
                <p className="text-paper leading-relaxed">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

    </div>
  );
}