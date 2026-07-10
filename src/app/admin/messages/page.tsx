"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/messages");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load messages.");
      setMessages(json.messages);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: string, read: boolean) {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl text-paper mb-8">Messages</h1>

      {error && <p className="text-red-400 font-mono text-sm">{error}</p>}

      {messages === null ? (
        <p className="text-ink-400 font-mono text-sm">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-ink-400">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`border rounded-lg p-5 ${
                m.read ? "border-ink-600/50 bg-ink-600/10" : "border-amber/40 bg-ink-600/20"
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-paper font-display text-lg">{m.name}</p>
                  <a href={`mailto:${m.email}`} className="font-mono text-xs text-amber hover:underline">
                    {m.email}
                  </a>
                </div>
                <p className="font-mono text-xs text-ink-400">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-ink-400 mt-3 whitespace-pre-wrap">{m.message}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => toggleRead(m.id, m.read)}
                  className="font-mono text-xs uppercase tracking-wider text-ink-400 hover:text-teal transition-colors"
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="font-mono text-xs uppercase tracking-wider text-ink-400 hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
