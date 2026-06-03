
import { redirect } from "next/navigation";
import { getServerSession } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (user?.username) {
    redirect("/dashboard");
  }

  return <OnboardingForm />;
}
