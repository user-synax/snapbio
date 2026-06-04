
import { getServerSession } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import Subscription from "../../../models/Subscription";
import BillingClient from "./BillingClient";

export default async function BillingPage() {
  const session = await getServerSession();
  await connectToDatabase();
  
  const user = await User.findOne({ email: session.user.email });
  const subscription = await Subscription.findOne({ userId: user._id, status: "active" });

  return (
    <BillingClient user={user} subscription={subscription} />
  );
}
