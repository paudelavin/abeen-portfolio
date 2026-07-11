import { NextResponse } from "next/server";
import { getTotalVisits } from "@/lib/visitCounter";

export async function GET() {
  return NextResponse.json({ total: getTotalVisits() });
}