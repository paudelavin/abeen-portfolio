import { Award, ExternalLink } from "lucide-react";

export function CertBadge({ name, file }: { name: string; file: string }) {
  return (
    <a
      href={file}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 border border-ink-600/70 rounded-lg px-4 py-3 bg-ink-600/20 card-hover group"
    >
      <Award size={16} className="text-teal shrink-0" />
      <span className="font-mono text-[12px] text-paper flex-1">{name}</span>
      <ExternalLink size={13} className="text-ink-400 group-hover:text-amber transition-colors shrink-0" />
    </a>
  );
}