"use client";

import { useState } from "react";
import { TicketLabel } from "@/components/TicketLabel";

export default function ToolkitPage() {
  // --- Sprint Capacity State ---
  const [teamSize, setTeamSize] = useState(5);
  const [sprintDays, setSprintDays] = useState(10);
  const [daysOff, setDaysOff] = useState(0);
  const [focusFactor, setFocusFactor] = useState(70);

  const calculateCapacity = () => {
    const totalHours = teamSize * sprintDays * 8 * (focusFactor / 100);
    const daysOffHours = daysOff * 8;
    const finalHours = Math.max(0, totalHours - daysOffHours);
    const storyPoints = Math.round(finalHours / 6);
    return { hours: Math.round(finalHours), points: storyPoints };
  };

  const capacity = calculateCapacity();

  // --- RICE State ---
  const [reach, setReach] = useState(1000);
  const [impact, setImpact] = useState(2);
  const [confidence, setConfidence] = useState(100);
  const [effort, setEffort] = useState(5);

  const calculateRice = () => {
    if (effort === 0) return 0;
    const score = (reach * impact * (confidence / 100)) / effort;
    return Number(score.toFixed(1));
  };

  // Shared input styling
  const inputClass = "w-full bg-white dark:bg-ink-900 border border-ink-300 dark:border-ink-600 rounded px-4 py-3 text-ink-900 dark:text-paper font-mono text-sm focus:outline-none focus:border-amber transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const labelClass = "font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400 block mb-2";
  
  // Shared card and result box styling
  const cardClass = "border border-ink-300 dark:border-ink-600 rounded-lg p-6 sm:p-8 bg-white dark:bg-ink-800/30 relative overflow-hidden shadow-sm dark:shadow-none";
  const resultBoxClass = "mt-8 p-5 rounded-lg border flex flex-col items-center justify-center text-center transition-colors";

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <TicketLabel id="POUDEL-TOOLKIT" status="in-progress" />
      <h1 className="font-display text-3xl sm:text-5xl text-ink-900 dark:text-paper mt-4">
        PM Toolkit
      </h1>
      <p className="text-ink-500 dark:text-ink-400 mt-4 max-w-2xl">
        A set of interactive tools I use to help teams plan, prioritize, and ship better products.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        
        {/* SPRINT CAPACITY */}
        <div className={cardClass}>
          <div className="absolute top-0 left-0 w-full h-1 bg-amber"></div>
          <h2 className="font-display text-xl text-ink-900 dark:text-paper mb-6">Sprint Capacity</h2>
          
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Team Size (people)</label>
              <input type="number" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Sprint Length (days)</label>
              <input type="number" value={sprintDays} onChange={(e) => setSprintDays(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Total Days Off</label>
              <input type="number" value={daysOff} onChange={(e) => setDaysOff(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label className={`${labelClass} mb-0`}>Focus Factor</label>
                <span className="font-mono text-xs text-amber font-bold">{focusFactor}%</span>
              </div>
              <input type="range" min="10" max="100" value={focusFactor} onChange={(e) => setFocusFactor(Number(e.target.value))} className="w-full accent-amber" />
            </div>
          </div>

          <div className={`${resultBoxClass} bg-amber-50 dark:bg-ink-900 border-amber-200 dark:border-amber-500/20`}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-1">Estimated Capacity</p>
            <div className="flex items-baseline gap-2">
              <p className="font-display text-4xl text-amber">{capacity.hours}</p>
              <span className="font-mono text-sm text-ink-500 dark:text-ink-400">hrs</span>
            </div>
            <p className="font-mono text-sm text-ink-900 dark:text-paper mt-2">~{capacity.points} Story Points</p>
          </div>
        </div>

        {/* RICE PRIORITIZATION */}
        <div className={cardClass}>
          <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
          <h2 className="font-display text-xl text-ink-900 dark:text-paper mb-6">RICE Prioritizer</h2>
          
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Reach (users/month)</label>
              <input type="number" value={reach} onChange={(e) => setReach(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Impact (0.25 to 3)</label>
              <input type="number" step="0.25" value={impact} onChange={(e) => setImpact(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Confidence (%)</label>
              <input type="number" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Effort (person-months)</label>
              <input type="number" value={effort} onChange={(e) => setEffort(Number(e.target.value))} className={inputClass} />
            </div>
          </div>

          <div className={`${resultBoxClass} bg-teal-50 dark:bg-ink-900 border-teal-200 dark:border-teal-500/20`}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-1">RICE Score</p>
            <p className="font-display text-5xl text-teal-600 dark:text-teal-400">{calculateRice()}</p>
            <p className="font-mono text-[10px] text-ink-500 dark:text-ink-400 mt-2">Higher is better</p>
          </div>
        </div>

      </div>
    </div>
  );
}