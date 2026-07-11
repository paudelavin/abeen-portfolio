"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

export function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function loadComments() {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setComments([]);
    }
  }

  useEffect(() => {
    loadComments();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, name, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      setName("");
      setContent("");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="mt-16 pt-10 border-t border-ink-600/60">
      <h3 className="font-display text-xl text-paper mb-6">
        Comments {comments ? `(${comments.length})` : ""}
      </h3>

      {status === "sent" ? (
        <div className="border border-teal/40 rounded-lg p-5 bg-teal/10 mb-8">
          <p className="text-paper text-sm">
            Thanks — your comment has been submitted and will appear once reviewed.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="bg-ink-600/30 border border-ink-600 rounded px-4 py-2.5 text-paper text-sm focus:outline-none focus:border-amber transition-colors"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Leave a comment..."
            required
            rows={3}
            className="bg-ink-600/30 border border-ink-600 rounded px-4 py-2.5 text-paper text-sm focus:outline-none focus:border-amber transition-colors resize-none"
          />
          {status === "error" && <p className="text-sm text-red-400 font-mono">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start bg-amber text-ink-900 font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}

      {comments === null ? (
        <p className="text-ink-400 font-mono text-sm">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-ink-400 text-sm">No comments yet — be the first.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {comments.map((c) => (
            <div key={c.id} className="border border-ink-600/60 rounded-lg p-4 bg-ink-600/10">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-mono text-xs text-amber">{c.name}</p>
                <p className="font-mono text-[10px] text-ink-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-paper text-sm leading-relaxed whitespace-pre-wrap">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}