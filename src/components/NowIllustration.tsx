type IllustrationType = "working" | "studying" | "learning" | "writing";

export function NowIllustration({ type }: { type: IllustrationType }) {
  const illustrations: Record<IllustrationType, JSX.Element> = {
    working: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="15" y="30" width="90" height="60" rx="6" fill="none" stroke="#E8A93A" strokeWidth="2.5" />
        <rect x="25" y="42" width="20" height="14" rx="2" fill="#E8A93A" opacity="0.25" className="now-float-1" />
        <rect x="50" y="42" width="20" height="14" rx="2" fill="#2F8F7A" opacity="0.35" className="now-float-2" />
        <rect x="75" y="42" width="20" height="14" rx="2" fill="#8B93A3" opacity="0.25" className="now-float-3" />
        <rect x="25" y="64" width="20" height="14" rx="2" fill="#2F8F7A" opacity="0.3" className="now-float-2" />
        <rect x="50" y="64" width="20" height="14" rx="2" fill="#E8A93A" opacity="0.3" className="now-float-1" />
        <circle cx="60" cy="18" r="6" fill="#E8A93A" className="now-bounce" />
      </svg>
    ),
    studying: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <g className="now-float-1">
          <rect x="30" y="55" width="60" height="10" rx="2" fill="#2F8F7A" opacity="0.5" />
        </g>
        <g className="now-float-2">
          <rect x="35" y="42" width="50" height="10" rx="2" fill="#E8A93A" opacity="0.6" />
        </g>
        <g className="now-float-3">
          <rect x="30" y="29" width="60" height="10" rx="2" fill="#8B93A3" opacity="0.4" />
        </g>
        <circle cx="90" cy="85" r="14" fill="none" stroke="#E8A93A" strokeWidth="2.5" />
        <line x1="100" y1="95" x2="108" y2="103" stroke="#E8A93A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    learning: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="55" r="22" fill="none" stroke="#E8A93A" strokeWidth="2.5" className="now-pulse" />
        <line x1="60" y1="77" x2="60" y2="88" stroke="#E8A93A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="88" x2="72" y2="88" stroke="#E8A93A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 50 Q60 38 70 50" stroke="#2F8F7A" strokeWidth="2.5" fill="none" strokeLinecap="round" className="now-float-1" />
        <circle cx="60" cy="60" r="5" fill="#2F8F7A" opacity="0.5" />
      </svg>
    ),
    writing: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="28" y="24" width="64" height="76" rx="4" fill="none" stroke="#8B93A3" strokeWidth="2.5" />
        <line x1="38" y1="42" x2="82" y2="42" stroke="#E8A93A" strokeWidth="2.5" strokeLinecap="round" className="now-float-1" />
        <line x1="38" y1="56" x2="82" y2="56" stroke="#2F8F7A" strokeWidth="2.5" strokeLinecap="round" className="now-float-2" />
        <line x1="38" y1="70" x2="65" y2="70" stroke="#E8A93A" strokeWidth="2.5" strokeLinecap="round" className="now-float-3" />
        <path d="M85 85 L98 72 L104 78 L91 91 L84 93 Z" fill="#E8A93A" className="now-bounce" />
      </svg>
    ),
  };

  return <div className="w-16 h-16 shrink-0">{illustrations[type]}</div>;
}