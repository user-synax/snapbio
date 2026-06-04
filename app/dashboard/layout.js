
import Link from "next/link";
import { getServerSession } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import { Toaster } from "../../components/ui/sonner";
import { DesktopNav, MobileNav } from "../../components/DashboardNav";
import { getRandomEmoji, getAvatarBgColor } from "../../lib/avatar";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });
  
  // Check if user is admin
  const isAdmin = user.email === process.env.ADMIN_EMAIL;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#090909]">
      {/* Mobile bottom nav */}
      <MobileNav isPro={user.isPro} isAdmin={isAdmin} />

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[#090909] border-r border-[#262626] h-screen sticky top-0">
        <div className="p-6">
          <Link href="/dashboard">
            <h1 className={`${plusJakarta.className} text-2xl font-bold tracking-tight text-white`} style={{ letterSpacing: "-1.0px" }}>
              Snapbio
            </h1>
          </Link>
        </div>

        <DesktopNav isPro={user.isPro} isAdmin={isAdmin} />

        {/* Sidebar footer */}
        <div className="p-4 border-t border-[#262626] mt-auto">
          <div className="flex items-center gap-3">
            {user.avatarUrl || user.image ? (
              <img
                src={user.avatarUrl || user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: getAvatarBgColor(user._id.toString()) }}
              >
                {getRandomEmoji(user._id.toString())}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                {user.name}
              </p>
              <p className="text-xs text-[#999999] truncate" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: "400", letterSpacing: "-0.12px", lineHeight: "1.20" }}>
                @{user.username}
              </p>
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
