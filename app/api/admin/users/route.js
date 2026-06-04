
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";

export const runtime = "nodejs";

export async function GET(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });
  
  // Check if user is admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await User.find().sort({ createdAt: -1 });
  return NextResponse.json(users);
}
