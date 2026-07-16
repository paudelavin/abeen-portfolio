import Link from "next/link";
import { prisma } from "@/lib/db";
import { TicketLabel } from "@/components/TicketLabel";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export const metadata = { title: "Blog — Abeen Poudel" };
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <TicketLabel id="POUDEL-05" status="in-progress" />
      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4">Blog</h1>
      <p className="text-ink-400 mt-3 max-w-2xl">
        Notes on product management, Agile facilitation, and things I&apos;m learning.
      </p>

      {posts.length === 0 ? (
        <div className="mt-14 border border-dashed border-ink-600 rounded-lg p-10 text-center">
          <p className="font-mono text-xs text-ink-400 uppercase tracking-widest">
            Backlog is empty
          </p>
          <p className="text-ink-400 mt-2">No posts published yet — check back soon.</p>
        </div>
      ) : (
        <div className="mt-12 flex flex-col gap-5">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 80}>
              <TiltCard>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block border border-ink-600/70 rounded-lg p-6 bg-ink-600/20 hover:border-amber/60 transition-colors"
                >
                  <p className="font-mono text-xs text-ink-400">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-display text-2xl text-paper mt-2">{post.title}</h2>
                  <p className="text-ink-400 mt-2 leading-relaxed">{post.excerpt}</p>
                  <span className="font-mono text-xs text-amber mt-4 inline-block">
                    Read post →
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}