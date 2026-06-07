
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import Click from "../../../models/Click";
import Activity from "../../../models/Activity";
import Link from "../../../models/Link";

export const runtime = "nodejs";

export async function POST(request) {
  const { linkId, userId } = await request.json();

  const country = request.headers.get("x-vercel-ip-country") || "Unknown";
  const city = request.headers.get("x-vercel-ip-city") || "Unknown";
  const referrer = request.headers.get("referer") || "Direct";

  await connectToDatabase();

  const click = await Click.create({
    linkId,
    userId,
    country,
    city,
    referrer,
  });

  const link = await Link.findById(linkId);
  await Activity.create({
    userId,
    type: "link_clicked",
    metadata: { 
      linkId, 
      title: link?.title || "Unknown", 
      country, 
      city 
    },
  });

  return NextResponse.json({ ok: true });
}
