"use client";

import { useEffect, useState } from "react";
import NepaliDate from "nepali-date-converter";

export function NepaliDateTime() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    function update() {
      // Current time in Nepal (UTC+5:45), regardless of visitor's own timezone
      const now = new Date();
      const nepalNow = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })
      );

      const bs = new NepaliDate(nepalNow);
      const dateStr = bs.format("ddd, DD MMMM YYYY", "en");

      const timeStr = nepalNow.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setText(`${dateStr} · ${timeStr} NPT`);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!text) return null;

  return (
    <span className="font-mono text-[11px] text-ink-400">
      {text}
    </span>
  );
}