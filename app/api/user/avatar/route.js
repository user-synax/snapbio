
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "snapbio-avatars" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  await connectToDatabase();
  await User.updateOne(
    { email: session.user.email },
    { $set: { avatarUrl: result.secure_url } }
  );

  return NextResponse.json({ avatarUrl: result.secure_url });
}
