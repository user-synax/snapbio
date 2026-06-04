
import { getServerSession } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import Link from "../../models/Link";
import Click from "../../models/Click";
import DashboardClient from "./DashboardClient";

export default async function DashboardOverview() {
  const session = await getServerSession();
  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  // Fetch stats
  const totalLinks = await Link.countDocuments({ userId: user._id });
  const totalClicks = await Click.countDocuments({ userId: user._id });

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

  return (
    <DashboardClient
      user={serializedUser}
      stats={{ totalLinks, totalClicks }}
    />
  );
}
