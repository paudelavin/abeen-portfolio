"use client";

import { useEffect, useState } from "react";
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

export function LikeButton({ postId }: { postId: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLiked(data.liked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider border rounded px-3 py-2 transition-colors ${
        liked
          ? "border-amber text-amber bg-amber/10"
          : "border-ink-600 text-ink-400 hover:border-amber hover:text-amber"
      }`}
    >
      <Heart size={14} fill={liked ? "currentColor" : "none"} />
      {count === null ? "..." : count}
    </button>
  );
}