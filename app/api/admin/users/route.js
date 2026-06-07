
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";
import Subscription from "../../../../models/Subscription";

export const runtime = "nodejs";

export async function GET(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const adminUser = await User.findOne({ email: session.user.email });
  
  // Check if user is admin
  if (adminUser.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get users with their subscriptions
  const users = await User.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "userId",
        as: "subscriptions",
      },
    },
  ]);

  return NextResponse.json(users);
}

// Admin subscription management endpoints
export async function PUT(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const adminUser = await User.findOne({ email: session.user.email });
  
  if (adminUser.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { userId, action, days = 30, plan = "monthly" } = body;

  if (!userId || !action) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  switch (action) {
    case "grant_pro": {
      // Grant Pro to user
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + days);

      // Create new subscription
      await Subscription.create({
        userId,
        plan,
        startDate,
        endDate,
        status: "active",
      });

      // Update user isPro flag
      await User.findByIdAndUpdate(userId, { isPro: true });

      return NextResponse.json({ message: "Pro granted successfully" });
    }

    case "extend": {
      // Extend active subscription or create new one
      const activeSub = await Subscription.findOne({ userId, status: "active" });
      
      if (activeSub) {
        const newEndDate = new Date(activeSub.endDate);
        newEndDate.setDate(newEndDate.getDate() + days);
        await Subscription.findByIdAndUpdate(activeSub._id, { endDate: newEndDate });
      } else {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        await Subscription.create({
          userId,
          plan,
          startDate,
          endDate,
          status: "active",
        });
        await User.findByIdAndUpdate(userId, { isPro: true });
      }

      return NextResponse.json({ message: "Subscription extended successfully" });
    }

    case "cancel": {
                      // Cancel user's subscription, set isPro to false, and reset theme to default
                      await Subscription.updateMany({ userId, status: "active" }, { status: "expired" });
                      await User.findByIdAndUpdate(userId, { isPro: false, theme: "warm-sand" });
                      
                      return NextResponse.json({ message: "Subscription canceled successfully" });
                    }

    default: {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  }
}
