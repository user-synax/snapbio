
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await request.json();

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  if (!USERNAME_REGEX.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3-20 lowercase letters, numbers, or underscores" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "Username taken" }, { status: 409 });
  }

  await User.updateOne(
    { email: session.user.email },
    { $set: { username } }
  );

  return NextResponse.json({ success: true });
}
