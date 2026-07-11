"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  postId: string;
  name: string;
  content: string;
  approved: boolean;
  createdAt: string;
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/comments-all");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load comments.");
      setComments(json.comments);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleApprove(id: string, approved: boolean) {
    await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !approved }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this comment?")) return;
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl text-paper mb-8">Comments</h1>

      {error && <p className="text-red-400 font-mono text-sm">{error}</p>}

      {comments === null ? (
        <p className="text-ink-400 font-mono text-sm">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-ink-400">No comments yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className={`border rounded-lg p-5 ${
                c.approved ? "border-ink-600/50 bg-ink-600/10" : "border-amber/40 bg-ink-600/20"
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <p className="font-display text-paper">{c.name}</p>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border ${
                      c.approved ? "text-teal border-teal/40" : "text-backlog border-backlog/40"
                    }`}
                  >
                    {c.approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="font-mono text-xs text-ink-400">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-ink-400 text-sm mb-4">{c.content}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => toggleApprove(c.id, c.approved)}
                  className="font-mono text-xs uppercase tracking-wider text-ink-400 hover:text-teal transition-colors"
                >
                  {c.approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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