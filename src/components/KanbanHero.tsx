type Card = { id: string; title: string; sub: string };

const columns: { name: string; accent: string; cards: Card[] }[] = [
  {
    name: "Backlog",
    accent: "border-t-backlog",
    cards: [
      { id: "POUDEL-11", title: "Scale product ops at Maatri Nepal", sub: "Next up" },
{ id: "POUDEL-12", title: "Earn ICP-ACC (Agile Coaching)", sub: "Up next" },
{ id: "POUDEL-13", title: "Earn PMP® Certification", sub: "Roadmap" },
    ],
  },
  {
    name: "In Progress",
    accent: "border-t-amber",
    cards: [
      { id: "POUDEL-08", title: "Product Project Manager", sub: "Maatri Nepal · since Oct 2025" },
    ],
  },
  {
    name: "Done",
    accent: "border-t-teal",
    cards: [
      { id: "POUDEL-06", title: "Led Agile transformation", sub: "CrossOver Nepal" },
      { id: "POUDEL-05", title: "90% on-time delivery, 10–15% cost savings", sub: "Mokshya Tech" },
      { id: "POUDEL-CSM", title: "Certified ScrumMaster®", sub: "CSM · PMP training" },
    ],
  },
];

export function KanbanHero() {
  let cardIndex = 0;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {columns.map((col) => (
        <div key={col.name} className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-mono text-xs tracking-widest text-ink-400 uppercase">
              {col.name}
            </h3>
            <span className="font-mono text-xs text-ink-400">{col.cards.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {col.cards.map((card) => {
              const delay = cardIndex * 90;
              cardIndex += 1;
              return (
                <div
                  key={card.id}
                  style={{ animationDelay: `${delay}ms` }}
                  className={`kanban-card opacity-0 border-t-2 ${col.accent} bg-ink-600/60 backdrop-blur-sm rounded-md rounded-t-none p-3 shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:shadow-xl transition-transform duration-200`}
                >
                  <p className="font-mono text-[10px] text-ink-400 mb-1.5">{card.id}</p>
                  <p className="font-body text-sm text-paper leading-snug">{card.title}</p>
                  <p className="font-mono text-[10px] text-ink-400 mt-2">{card.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .kanban-card {
          animation: cardIn 0.5s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .kanban-card { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
