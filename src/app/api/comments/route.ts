import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId") || "";
  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }
  const comments = await prisma.comment.findMany({
    where: { postId, approved: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ comments });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const postId = String(body.postId || "");
  const name = String(body.name || "").trim();
  const content = String(body.content || "").trim();

  if (!postId || !name || !content) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (content.length > 2000) {
    return NextResponse.json({ error: "Comment is too long." }, { status: 400 });
  }

  await prisma.comment.create({ data: { postId, name, content } });
  return NextResponse.json({ ok: true });
}