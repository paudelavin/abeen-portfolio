import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/db";
import { TicketLabel } from "@/components/TicketLabel";
import { LikeButton } from "@/components/LikeButton";
import { CommentsSection } from "@/components/CommentsSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  return { title: post ? `${post.title} — Abeen Poudel` : "Post not found" };
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
      <p className="font-mono text-xs text-ink-400 mt-3">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
     <div className="prose-post mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
      <div className="mt-10">
        <LikeButton postId={post.id} />
      </div>
      <CommentsSection postId={post.id} />
    </article>
  );
}
