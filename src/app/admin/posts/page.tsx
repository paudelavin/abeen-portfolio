"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/posts");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load posts.");
      setPosts(json.posts);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-paper">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-amber text-ink-900 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded hover:bg-amber-600 transition-colors"
        >
          New Post
        </Link>
      </div>

      {error && <p className="text-red-400 font-mono text-sm">{error}</p>}

      {posts === null ? (
        <p className="text-ink-400 font-mono text-sm">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-ink-400">No posts yet. Create your first one.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-ink-600/70 rounded-lg p-5 bg-ink-600/20 flex items-center justify-between flex-wrap gap-3"
            >
              <div>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border ${
                    post.published
                      ? "text-teal border-teal/40"
                      : "text-backlog border-backlog/40"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
                <h2 className="font-display text-lg text-paper mt-2">{post.title}</h2>
                <p className="font-mono text-xs text-ink-400 mt-1">/blog/{post.slug}</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="font-mono text-xs uppercase tracking-wider text-ink-400 hover:text-amber transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
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
