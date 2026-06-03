
import Link from "next/link";
import { getServerSession } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import { Toaster } from "../../components/ui/sonner";
import { DesktopNav, MobileNav } from "../../components/DashboardNav";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile bottom nav */}
      <MobileNav isPro={user.isPro} />

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[#0A0A0F] border-r border-[#2A2A35] h-screen sticky top-0">
        <div className="p-6">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white">
              Snapbio
            </h1>
          </Link>
        </div>

        <DesktopNav isPro={user.isPro} />

        {/* Sidebar footer */}
        <div className="p-4 border-t border-[#2A2A35]">
          <div className="flex items-center gap-3">
            <img
              src={user.avatarUrl || user.image}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-[#94A3B8] truncate">@{user.username}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 pb-20 md:pb-6">
        {children}
        <Toaster />
      </main>
    </div>
  );
}
