import { Award } from "lucide-react";

export function CertBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 border border-ink-600/70 rounded-lg px-4 py-3 bg-ink-600/20 card-hover">
      <Award size={16} className="text-teal shrink-0" />
      <span className="font-mono text-[12px] text-paper">{name}</span>
    </div>
  );
}