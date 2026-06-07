
import { getServerSession } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import Link from "../../models/Link";
import Click from "../../models/Click";
import ProfileView from "../../models/ProfileView";
import DashboardClient from "./DashboardClient";

export default async function DashboardOverview() {
  const session = await getServerSession();
  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  // Calculate today's date range
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Calculate date ranges for link growth
  const last7Start = new Date();
  last7Start.setDate(last7Start.getDate() - 7);
  const previous7Start = new Date();
  previous7Start.setDate(previous7Start.getDate() - 14);

  // Calculate date range for top performing link (30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch all stats in parallel
  const [
    totalLinks,
    totalClicks,
    totalViews,
    todaysClicks,
    todaysViews,
    linksLast7,
    linksPrevious7,
    topLinkAgg,
  ] = await Promise.all([
    Link.countDocuments({ userId: user._id }),
    Click.countDocuments({ userId: user._id }),
    ProfileView.countDocuments({ userId: user._id }),
    Click.countDocuments({ 
      userId: user._id, 
      timestamp: { $gte: todayStart, $lte: todayEnd } 
    }),
    ProfileView.countDocuments({ 
      userId: user._id, 
      timestamp: { $gte: todayStart, $lte: todayEnd } 
    }),
    Link.countDocuments({ 
      userId: user._id, 
      createdAt: { $gte: last7Start } 
    }),
    Link.countDocuments({ 
      userId: user._id, 
      createdAt: { $gte: previous7Start, $lt: last7Start } 
    }),
    Click.aggregate([
      { $match: { userId: user._id, timestamp: { $gte: thirtyDaysAgo } } },
      { $group: { _id: "$linkId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      { $lookup: { from: "links", localField: "_id", foreignField: "_id", as: "link" } },
      { $unwind: "$link" },
      { $project: { title: "$link.title", count: 1, _id: 0 } }
    ])
  ]);

  // Calculate derived stats
  const conversionRate = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;
  const linkGrowth = linksPrevious7 > 0 
    ? Math.round(((linksLast7 - linksPrevious7) / linksPrevious7) * 100) 
    : linksLast7 > 0 ? 100 : 0;
  const topPerformingLink = topLinkAgg.length > 0 ? topLinkAgg[0] : null;

  // Convert to plain object to pass to client component
  const serializedUser = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    username: user.username,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    image: user.image,
    isPro: user.isPro,
    theme: user.theme,
  };

  const stats = {
    totalLinks,
    totalClicks,
    totalViews,
    todaysClicks,
    todaysViews,
    conversionRate,
    topPerformingLink,
    linkGrowth,
  };

  return (
    <DashboardClient
      user={serializedUser}
      stats={stats}
    />
  );
}
