
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export async function PATCH(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const { name, username, bio } = data;

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Update fields
  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;

  if (username !== undefined) {
    // If username is changed, validate and check availability
    if (username !== user.username) {
      if (!USERNAME_REGEX.test(username)) {
        return NextResponse.json(
          { error: "Username must be 3-20 lowercase letters, numbers, or underscores" },
          { status: 400 }
        );
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return NextResponse.json({ error: "Username taken" }, { status: 409 });
      }
    }
    user.username = username;
  }

  await user.save();

  return NextResponse.json({ user });
}
