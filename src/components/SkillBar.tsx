export function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[11px] text-paper">{name}</span>
        <span className="font-mono text-[10px] text-ink-400">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-ink-600/50 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}