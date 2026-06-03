
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import Link from "../../../models/Link";

export const runtime = "nodejs";

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, url } = await request.json();

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const linkCount = await Link.countDocuments({ userId: user._id });

  if (!user.isPro && linkCount >= 5) {
    return NextResponse.json({ error: "upgrade_required" }, { status: 403 });
  }

  const newLink = new Link({
    userId: user._id,
    title,
    url,
    order: linkCount,
    isActive: true,
  });

  await newLink.save();
  return NextResponse.json(newLink);
}
