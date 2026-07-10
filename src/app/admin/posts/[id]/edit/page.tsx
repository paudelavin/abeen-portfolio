import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl text-paper mb-8">Edit Post</h1>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          published: post.published,
        }}
      />
    </div>
  );
}
