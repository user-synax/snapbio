
"use client";

import { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function DashboardClient({ user, stats }) {
  const bioUrl = `/${user.username}`;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stats card (surface-1) */}
        <div className="bg-[#141414] rounded-[20px] p-6">
          <p className="text-[#999999] mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
            Total Links
          </p>
          <p className={`${plusJakarta.className} text-3xl font-bold text-white`} style={{ letterSpacing: "-1.0px" }}>
            {stats.totalLinks}
          </p>
        </div>

        <div className="bg-[#141414] rounded-[20px] p-6">
          <p className="text-[#999999] mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
            Total Clicks
          </p>
          <p className={`${plusJakarta.className} text-3xl font-bold text-white`} style={{ letterSpacing: "-1.0px" }}>
            {stats.totalClicks}
          </p>
        </div>

        <div className="bg-[#141414] rounded-[20px] p-6">
          <p className="text-[#999999] mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
            Profile Views
          </p>
          <p className={`${plusJakarta.className} text-3xl font-bold text-[#999999]`} style={{ letterSpacing: "-1.0px" }}>
            Coming soon
          </p>
        </div>
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
      </div>
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
