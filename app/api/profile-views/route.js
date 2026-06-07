
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import ProfileView from "../../../models/ProfileView";
import { auth } from "../../../auth";
import Activity from "../../../models/Activity";

export const runtime = "nodejs";

export async function POST(request) {
  const { userId } = await request.json();

  const country = request.headers.get("x-vercel-ip-country") || "Unknown";
  const city = request.headers.get("x-vercel-ip-city") || "Unknown";
  const referrer = request.headers.get("referer") || "Direct";
  const userAgent = request.headers.get("user-agent") || "Unknown";
  const ipAddress = request.headers.get("x-forwarded-for") || request.ip || "Unknown";

  await connectToDatabase();

  await ProfileView.create({
    userId,
    country,
    city,
    referrer,
    userAgent,
    ipAddress,
  });

  await Activity.create({
    userId,
    type: "profile_viewed",
    metadata: { country, city, referrer },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(request) {
  const session = await auth();
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "7";
  const days = parseInt(period);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const views = await ProfileView.find({
    userId: session.user.id,
    timestamp: { $gte: startDate },
  }).sort({ timestamp: -1 });

  const totalViews = await ProfileView.countDocuments({
    userId: session.user.id,
  });

  const viewsByDay = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const count = await ProfileView.countDocuments({
      userId: session.user.id,
      timestamp: {
        $gte: date,
        $lt: nextDate,
      },
    });

    viewsByDay.push({
      date: date.toISOString().split("T")[0],
      count,
    });
  }

  const viewsByCountry = await ProfileView.aggregate([
    { $match: { userId: session.user.id, timestamp: { $gte: startDate } } },
    { $group: { _id: "$country", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  return NextResponse.json({
    views,
    totalViews,
    viewsByDay,
    viewsByCountry,
  });
}
