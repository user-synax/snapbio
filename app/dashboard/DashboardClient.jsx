
"use client";

import { useState, useEffect } from "react";
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Plus, 
  Settings, 
  Palette,
  TrendingUp,
  Link as LinkIcon,
  Eye,
  MousePointerClick
} from "lucide-react";
import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

// Helper function to format relative time
function formatRelativeTime(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `${diffDay}d ago`;
  if (diffHour > 0) return `${diffHour}h ago`;
  if (diffMin > 0) return `${diffMin}m ago`;
  return "Just now";
}

// Activity Feed Component
function ActivityFeed({ userId, isPro }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchActivities = async (currentPage = 1, currentFilter = "all") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/activities?page=${currentPage}&limit=10&type=${currentFilter}`);
      const data = await res.json();
      if (currentPage === 1) {
        setActivities(data.activities);
      } else {
        setActivities(prev => [...prev, ...data.activities]);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(1, filter);
  }, [filter]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchActivities(nextPage, filter);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "link_created": return <Plus className="w-4 h-4 text-purple-500" />;
      case "link_clicked": return <MousePointerClick className="w-4 h-4 text-blue-500" />;
      case "profile_viewed": return <Eye className="w-4 h-4 text-green-500" />;
      case "profile_updated": return <Settings className="w-4 h-4 text-yellow-500" />;
      default: return <LinkIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case "link_created":
        return `Created new link "${activity.metadata?.title || "Untitled"}"`;
      case "link_clicked":
        return `Link "${activity.metadata?.title || "Untitled"}" got a click from ${activity.metadata?.country || "Unknown"}`;
      case "profile_viewed":
        return `Your profile was viewed from ${activity.metadata?.country || "Unknown"}`;
      case "profile_updated":
        return "Updated your profile";
      default:
        return "Activity occurred";
    }
  };

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className={`${plusJakarta.className} text-xl font-bold text-white`} style={{ letterSpacing: "-1.0px" }}>
          Recent Activity
        </h2>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 rounded-full text-sm font-medium bg-[#1c1c1c] text-white border-none focus:outline-none focus:ring-2 focus:ring-[#6a4cf5]"
          style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
        >
          <option value="all">All Activity</option>
          <option value="link_created">Link Created</option>
          <option value="link_clicked">Link Clicked</option>
          <option value="profile_viewed">Profile Viewed</option>
          <option value="profile_updated">Profile Updated</option>
        </select>
      </div>

      {loading && page === 1 ? (
        <div className="text-center py-8 text-[#999999]" style={{ fontFamily: "var(--font-inter)" }}>
          Loading activity...
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-8 text-[#999999]" style={{ fontFamily: "var(--font-inter)" }}>
          No activity yet. Start sharing your profile!
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity._id} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                  {getActivityText(activity)}
                </p>
                <p className="text-[#999999] text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                  {formatRelativeTime(activity.createdAt)}
                </p>
              </div>
            </div>
          ))}
          {page < totalPages && (
            <button
              onClick={handleLoadMore}
              className="w-full mt-4 py-3 rounded-full bg-[#1c1c1c] text-white font-medium hover:bg-[#262626] transition-colors"
              style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Stats Card Component
function StatsCard({ label, value, icon, isPro = false, isProOnly = false, userIsPro = false }) {
  if (isProOnly && !userIsPro) {
    return null;
  }

  return (
    <div className={`bg-[#141414] rounded-[20px] p-6 ${isProOnly ? "border border-purple-500/30" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
          {label}
        </p>
        {isProOnly && <div className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400" style={{ fontFamily: "var(--font-inter)" }}>PRO</div>}
        {icon && <div className="text-[#999999]">{icon}</div>}
      </div>
      <p className={`${plusJakarta.className} text-3xl font-bold text-white`} style={{ letterSpacing: "-1.0px" }}>
        {value}
      </p>
    </div>
  );
}

export default function DashboardClient({ user, stats }) {
  const bioUrl = `/${user.username}`;

  // Auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`} style={{ letterSpacing: "-1.0px" }}>
          Overview
        </h1>
        <p className="text-[#999999] mt-2" style={{ fontFamily: "var(--font-inter)", fontSize: "15px", letterSpacing: "-0.15px", lineHeight: "1.30" }}>
          Welcome back, {user.name}!
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatsCard 
          label="Total Links" 
          value={stats.totalLinks} 
          icon={<LinkIcon className="w-4 h-4" />} 
        />
        <StatsCard 
          label="Total Clicks" 
          value={stats.totalClicks} 
          icon={<MousePointerClick className="w-4 h-4" />} 
        />
        <StatsCard 
          label="Profile Views" 
          value={stats.totalViews} 
          icon={<Eye className="w-4 h-4" />} 
        />
        <StatsCard 
          label="Today's Clicks" 
          value={stats.todaysClicks} 
          icon={<MousePointerClick className="w-4 h-4 text-blue-500" />} 
        />
        <StatsCard 
          label="Today's Views" 
          value={stats.todaysViews} 
          icon={<Eye className="w-4 h-4 text-green-500" />} 
        />
        <StatsCard 
          label="Conversion Rate" 
          value={`${stats.conversionRate}%`} 
          icon={<TrendingUp className="w-4 h-4 text-purple-500" />} 
          isProOnly 
          userIsPro={user.isPro} 
        />
        <StatsCard 
          label="Top Performing Link" 
          value={stats.topPerformingLink ? `${stats.topPerformingLink.title} (${stats.topPerformingLink.count})` : "-"} 
          icon={<LinkIcon className="w-4 h-4 text-yellow-500" />} 
          isProOnly 
          userIsPro={user.isPro} 
        />
        <StatsCard 
          label="Link Growth" 
          value={`${stats.linkGrowth > 0 ? "+" : ""}${stats.linkGrowth}%`} 
          icon={<TrendingUp className="w-4 h-4 text-pink-500" />} 
          isProOnly 
          userIsPro={user.isPro} 
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Link href={bioUrl} target="_blank" rel="noopener noreferrer">
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
            style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
          >
            <ExternalLink className="w-4 h-4" />
            View your Snapbio
          </button>
        </Link>

        <CopyButton url={bioUrl} username={user.username} />

        <Link href="/dashboard/builder">
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#141414] text-white font-medium hover:bg-[#1c1c1c] transition-colors"
            style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
          >
            <Plus className="w-4 h-4" />
            Add New Link
          </button>
        </Link>

        <Link href="/dashboard/settings">
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#141414] text-white font-medium hover:bg-[#1c1c1c] transition-colors"
            style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
          >
            <Settings className="w-4 h-4" />
            Edit Profile
          </button>
        </Link>

        <Link href="/dashboard/builder">
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#141414] text-white font-medium hover:bg-[#1c1c1c] transition-colors"
            style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
          >
            <Palette className="w-4 h-4" />
            Change Theme
          </button>
        </Link>
      </div>

      {/* Activity Feed */}
      <ActivityFeed userId={user._id} isPro={user.isPro} />
    </div>
  );
}

function CopyButton({ url, username }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullUrl = `https://snapbio.usersynax.dev/${username}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#141414] text-white font-medium hover:bg-[#1c1c1c] transition-colors"
      style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
    >
      {copied ? (
        <Check className="w-4 h-4 text-[#22c55e]" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
