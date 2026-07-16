"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

function getClientId() {
  const key = "abeen_site_client_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

const CONFETTI_COLORS = ["#E8A93A", "#2F8F7A", "#8B93A3", "#F3F5F7"];

export function LikeButton({ postId }: { postId: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clientId = getClientId();
    fetch(`/api/likes/${postId}?clientId=${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setLiked(data.liked);
      })
      .catch(() => setCount(0));
  }, [postId]);

  function burstConfetti() {
    const pieces = Array.from({ length: 14 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.5;
      const distance = 40 + Math.random() * 30;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      return {
        id: Date.now() + i,
        style: {
          "--tx": `${tx}px`,
          "--ty": `${ty}px`,
          "--rot": `${Math.random() * 360}deg`,
          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          left: "50%",
          top: "50%",
        } as React.CSSProperties,
      };
    });
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 700);
  }

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    const clientId = getClientId();
    try {
      const res = await fetch(`/api/likes/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      });
      const data = await res.json();
      setCount(data.count);
      if (data.liked && !liked) burstConfetti();
      setLiked(data.liked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={loading}
      className={`relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider border rounded px-3 py-2 transition-colors ${
        liked
          ? "border-amber text-amber bg-amber/10"
          : "border-ink-600 text-ink-400 hover:border-amber hover:text-amber"
      }`}
    >
      <Heart size={14} fill={liked ? "currentColor" : "none"} />
      {count === null ? "..." : count}
      {confetti.map((c) => (
        <span key={c.id} className="confetti-piece" style={c.style} />
      ))}
    </button>
  );
}