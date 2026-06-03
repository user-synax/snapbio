
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import Click from "../../../models/Click";
import Link from "../../../models/Link";

export const runtime = "nodejs";

export async function GET(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (!user.isPro) {
    return NextResponse.json({ error: "Pro required" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "7d";

  let startDate;
  if (range === "7d") {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
  } else if (range === "30d") {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
  } else {
    startDate = new Date(0); // All time
  }

  const filter = {
    userId: user._id,
    timestamp: { $gte: startDate },
  };

  // Total clicks (all time)
  const totalClicks = await Click.countDocuments({ userId: user._id });

  // Clicks by day
  const clicksByDay = await Click.aggregate([
    { $match: filter },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: "$_id", count: "$count", _id: 0 } },
  ]);

  // Top links
  const topLinks = await Click.aggregate([
    { $match: filter },
    {
      $group: {
        _id: "$linkId",
        clickCount: { $sum: 1 },
      },
    },
    { $sort: { clickCount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "links",
        localField: "_id",
        foreignField: "_id",
        as: "link",
      },
    },
    { $unwind: "$link" },
    {
      $project: {
        linkId: "$_id",
        title: "$link.title",
        url: "$link.url",
        clickCount: "$clickCount",
        _id: 0,
      },
    },
  ]);

  // Clicks by country
  const clicksByCountry = await Click.aggregate([
    { $match: filter },
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $project: { country: "$_id", count: "$count", _id: 0 } },
  ]);

  return NextResponse.json({
    totalClicks,
    clicksByDay,
    topLinks,
    clicksByCountry,
  });
}
