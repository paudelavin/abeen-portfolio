"use client";

import { useState } from "react";
import { profile } from "@/lib/resume-data";
import { TicketLabel } from "@/components/TicketLabel";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <TicketLabel id="POUDEL-06" status="backlog" />
      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4">Get in Touch</h1>
      <p className="text-ink-400 mt-3">
        Open a ticket and I&apos;ll get back to you — or reach me directly at{" "}
        <a href={`mailto:${profile.email}`} className="text-amber hover:underline">
          {profile.email}
        </a>
        .
      </p>

      {status === "sent" ? (
        <div className="mt-10 border border-teal/40 rounded-lg p-8 bg-teal/10 flex flex-col items-center text-center">
          <div className="bouncy-pop w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#2F8F7A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="font-mono text-xs text-teal uppercase tracking-widest">Done</p>
          <p className="text-paper mt-2">
            Thanks for reaching out — your message has been received and I&apos;ll reply soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
              Name
            </label>
            <input
              name="name"
              required
              className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper focus:outline-none focus:border-amber transition-colors resize-none"
            />
          </div>
          {status === "error" && <p className="text-sm text-red-400 font-mono">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start bg-amber text-ink-900 font-mono text-xs uppercase tracking-wider px-6 py-3 rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}