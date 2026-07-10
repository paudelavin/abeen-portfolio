import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [postCount, draftCount, messageCount, unreadCount] = await Promise.all([
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.message.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Published posts", value: postCount },
    { label: "Drafts", value: draftCount },
    { label: "Messages", value: messageCount },
    { label: "Unread messages", value: unreadCount },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl text-paper">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-ink-600/70 rounded-lg p-5 bg-ink-600/20">
            <p className="font-display text-3xl text-paper">{s.value}</p>
            <p className="font-mono text-[11px] text-ink-400 uppercase tracking-widest mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-10">
        <Link
          href="/admin/posts/new"
          className="bg-amber text-ink-900 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded hover:bg-amber-600 transition-colors"
        >
          Write a new post
        </Link>
        <Link
          href="/admin/messages"
          className="border border-ink-600 text-paper font-mono text-xs uppercase tracking-wider px-5 py-3 rounded hover:border-amber hover:text-amber transition-colors"
        >
          View messages
        </Link>
      </div>
    </div>
  );
}
