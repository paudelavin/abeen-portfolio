export function TicketLabel({
  id,
  status = "backlog",
}: {
  id: string;
  status?: "backlog" | "in-progress" | "done";
}) {
  const colors: Record<string, string> = {
    backlog: "text-backlog border-backlog/40",
    "in-progress": "text-amber border-amber/40",
    done: "text-teal border-teal/40",
  };
  const labels: Record<string, string> = {
    backlog: "BACKLOG",
    "in-progress": "IN PROGRESS",
    done: "DONE",
  };
  return (
    <span
      className={`ticket-stamp inline-flex items-center gap-2 font-mono text-[11px] tracking-wider border rounded px-2 py-0.5 ${colors[status]}`}
    >
      <span>{id}</span>
      <span className="opacity-50">·</span>
      <span>{labels[status]}</span>
    </span>
  );
}