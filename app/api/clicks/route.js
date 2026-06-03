
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import Click from "../../../models/Click";

export const runtime = "nodejs";

export async function POST(request) {
  const { linkId, userId } = await request.json();

  const country = request.headers.get("x-vercel-ip-country") || "Unknown";
  const city = request.headers.get("x-vercel-ip-city") || "Unknown";
  const referrer = request.headers.get("referer") || "Direct";

  await connectToDatabase();

  await Click.create({
    linkId,
    userId,
    country,
    city,
    referrer,
  });

  return NextResponse.json({ ok: true });
}
