
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";
import PromoCode from "../../../../models/PromoCode";
import Subscription from "../../../../models/Subscription";

export const runtime = "nodejs";

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await request.json();

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Find promo code
  const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });
  if (!promoCode) {
    return NextResponse.json({ error: "Invalid promo code" }, { status: 400 });
  }

  if (promoCode.isRedeemed) {
    return NextResponse.json({ error: "Promo code already redeemed" }, { status: 400 });
  }

  // Calculate subscription duration
  const startDate = new Date();
  let endDate;
  switch (promoCode.plan) {
    case "monthly":
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "quarterly":
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    case "annual":
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    default:
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  // Mark promo code as redeemed
  promoCode.isRedeemed = true;
  promoCode.redeemedBy = user._id;
  promoCode.redeemedAt = startDate;
  await promoCode.save();

  // Create subscription
  const subscription = new Subscription({
    userId: user._id,
    plan: promoCode.plan,
    startDate,
    endDate,
    status: "active",
  });
  await subscription.save();

  // Update user isPro status
  user.isPro = true;
  await user.save();

  return NextResponse.json({ success: true, subscription, promoCode });
}
