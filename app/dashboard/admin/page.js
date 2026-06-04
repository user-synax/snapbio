
import { getServerSession } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const session = await getServerSession();
  await connectToDatabase();
  
  const user = await User.findOne({ email: session.user.email });
  
  // Check if user is admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  return (
    <AdminClient />
  );
}
