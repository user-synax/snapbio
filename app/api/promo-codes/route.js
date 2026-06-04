
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import PromoCode from "../../../models/PromoCode";

export const runtime = "nodejs";

// Generate a random promo code
function generatePromoCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

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

  const promoCodes = await PromoCode.find().sort({ createdAt: -1 }).populate("redeemedBy", "name email");
  return NextResponse.json(promoCodes);
}

export async function POST(request) {
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

  const { plan } = await request.json();
  
  // Generate unique promo code
  let code;
  let isUnique = false;
  while (!isUnique) {
    code = generatePromoCode();
    const existing = await PromoCode.findOne({ code });
    if (!existing) {
      isUnique = true;
    }
  }

  const newPromoCode = new PromoCode({
    code,
    plan,
  });

  await newPromoCode.save();
  return NextResponse.json(newPromoCode);
}
