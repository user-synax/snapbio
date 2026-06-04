
"use client";

import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function UpgradePrompt() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="relative overflow-hidden rounded-[30px] p-10 max-w-lg w-full" style={{ background: "#6a4cf5" }}>
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 text-center space-y-6">
          <h1
            className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
            style={{ letterSpacing: "-1.0px" }}
          >
            Unlock Analytics
          </h1>
          <p className="text-white/90 text-lg" style={{ fontFamily: "var(--font-inter)", fontSize: "18px", letterSpacing: "-0.18px", lineHeight: "1.30" }}>
            Get detailed insights into how your links are performing with
            click tracking, top links, and geographic data.
          </p>
          <Link href="/dashboard/billing">
            <button
              className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
              style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
            >
              Upgrade to Pro
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
