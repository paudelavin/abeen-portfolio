import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  const clientId = req.nextUrl.searchParams.get("clientId") || "";
  const count = await prisma.like.count({ where: { postId: params.postId } });
  const liked = clientId
    ? !!(await prisma.like.findUnique({
        where: { postId_clientId: { postId: params.postId, clientId } },
      }))
    : false;
  return NextResponse.json({ count, liked });
}

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  const body = await req.json();
  const clientId = String(body.clientId || "");
  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
  }

  const existing = await prisma.like.findUnique({
    where: { postId_clientId: { postId: params.postId, clientId } },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
  } else {
    await prisma.like.create({ data: { postId: params.postId, clientId } });
  }

  const count = await prisma.like.count({ where: { postId: params.postId } });
  return NextResponse.json({ count, liked: !existing });
}