"use client";

import { useState } from "react";
import { createElement } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const linkElements = links.map((link) =>
    createElement(
      "a",
      {
        key: link.name,
        href: link.href,
        target: "_blank",
        rel: "noreferrer",
        className:
          "font-mono text-xs text-ink-400 border border-ink-600 rounded px-3 py-1.5 hover:border-amber hover:text-amber transition-colors",
      },
      link.name
    )
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-400">
        Share
      </span>
      {linkElements}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-400 border border-ink-600 rounded px-3 py-1.5 hover:border-amber hover:text-amber transition-colors"
      >
        {copied ? <Check size={12} /> : <Link2 size={12} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}