
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ available: false }, { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ username: q });

  return NextResponse.json({ available: !existingUser });
}
