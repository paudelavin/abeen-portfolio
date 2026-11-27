"use client";
import { useEffect, useState } from "react";

export function RealVisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedSite");
    const recordVisit = async () => {
      try {
        const res = await fetch("/api/site-visits", { method: "POST" });
        const data = await res.json();
        setVisits(data.visits);
        sessionStorage.setItem("hasVisitedSite", "true");
      } catch (error) {
        console.error("Failed to record visit");
      }
    };

    if (!hasVisited) {
      recordVisit();
    } else {
      fetch("/api/site-visits", { method: "GET" })
        .then(res => res.json())
        .then(data => setVisits(data.visits))
        .catch(console.error);
    }
  }, []);

  if (visits === null) return <span>... visits</span>;
  return <span>{visits.toLocaleString()} visits</span>;
}