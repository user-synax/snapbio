
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function UpgradePrompt() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="relative overflow-hidden rounded-2xl p-10 max-w-lg w-full">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 text-center space-y-6">
          <h1
            className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
          >
            Unlock Analytics
          </h1>
          <p className="text-white/90 text-lg">
            Get detailed insights into how your links are performing with
            click tracking, top links, and geographic data.
          </p>
          <Link href="/dashboard/billing">
            <Button className="rounded-full bg-white text-violet-700 hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
