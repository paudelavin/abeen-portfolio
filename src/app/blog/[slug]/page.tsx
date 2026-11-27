import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/db";
import { TicketLabel } from "@/components/TicketLabel";
import { LikeButton } from "@/components/LikeButton";
import { CommentsSection } from "@/components/CommentsSection";
import { ShareButtons } from "@/components/ShareButtons";
import { PostViewCounter } from "@/components/PostViewCounter";
import { getFakeLikes } from "@/lib/fakeLikes";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post || !post.published) return { title: "Post not found" };
  const url = `https://www.abeenpoudel.com.np/blog/${post.slug}`;
  return {
    title: `${post.title} — Abeen Poudel`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <TicketLabel id="POUDEL-05" status="done" />
      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4">{post.title}</h1>
      
      <div className="font-mono text-xs text-ink-400 mt-3 flex items-center gap-3">
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span>•</span>
        <PostViewCounter postId={post.id} initialViews={post.views} />
      </div>

      <div className="prose-post mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <LikeButton postId={post.id} baseLikes={getFakeLikes(post.id, post.createdAt)} />
        <ShareButtons
          title={post.title}
          url={`https://www.abeenpoudel.com.np/blog/${post.slug}`}
        />
      </div>
      <CommentsSection postId={post.id} />
    </article>
  );
}