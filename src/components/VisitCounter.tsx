"use client";

import { useEffect, useState } from "react";

export function VisitCounter() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((res) => res.json())
      .then((data) => setTotal(data.total))
      .catch(() => setTotal(null));
  }, []);

  if (total === null) return null;

  return (
    <span className="font-mono text-[11px] text-ink-400">
      {total.toLocaleString()} visits since launch
    </span>
  );
}