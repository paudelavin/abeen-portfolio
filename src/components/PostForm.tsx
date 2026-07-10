"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PostInput = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
};

export function PostForm({ initial }: { initial?: PostInput }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [published, setPublished] = useState(initial?.published || false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initial?.id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/posts/${initial!.id}` : "/api/posts", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, published }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save post.");
      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div>
        <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
        />
      </div>
      <div>
        <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
          Excerpt <span className="normal-case text-ink-400/70">(shown on the blog list)</span>
        </label>
        <input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
        />
      </div>
      <div>
        <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
          Content <span className="normal-case text-ink-400/70">(Markdown supported)</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={16}
          className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper font-mono text-sm focus:outline-none focus:border-amber transition-colors resize-y"
        />
      </div>
      <label className="flex items-center gap-2 text-paper text-sm font-mono">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="accent-amber"
        />
        Published (visible on the public blog)
      </label>
      {error && <p className="text-sm text-red-400 font-mono">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="self-start bg-amber text-ink-900 font-mono text-xs uppercase tracking-wider px-6 py-3 rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}
