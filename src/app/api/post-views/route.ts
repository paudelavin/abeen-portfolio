import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    if (!postId) return NextResponse.json({ error: "Missing postId" }, { status: 400 });

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
      select: { views: true },
    });

    return NextResponse.json({ views: updatedPost.views });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
