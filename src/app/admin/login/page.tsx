"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed.");
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-400">Admin</p>
      <h1 className="font-display text-2xl text-paper mt-2 mb-8">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
            Username
          </label>
          <input
            name="username"
            required
            className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-ink-400 block mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full bg-ink-600/30 border border-ink-600 rounded px-4 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
          />
        </div>
        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-amber text-ink-900 font-mono text-xs uppercase tracking-wider px-6 py-3 rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
