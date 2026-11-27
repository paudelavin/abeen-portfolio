import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const stats = await prisma.siteStats.findUnique({ where: { id: "global" } });
    return NextResponse.json({ visits: stats?.visits || 0 });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const stats = await prisma.siteStats.upsert({
      where: { id: "global" },
      update: { visits: { increment: 1 } },
      create: { id: "global", visits: 1 },
    });
    return NextResponse.json({ visits: stats.visits });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}