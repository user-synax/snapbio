
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import { getServerSession } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import Link from "next/link";

export default async function DashboardOverview() {
  const session = await getServerSession();
  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });
  const bioUrl = `/${user.username}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white">
          Overview
        </h1>
        <p className="text-[#94A3B8] mt-1">Welcome back, {user.name}!</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#13131A] border-[#2A2A35] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#94A3B8] font-medium">Total Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">0</p>
          </CardContent>
        </Card>

        <Card className="bg-[#13131A] border-[#2A2A35] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#94A3B8] font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">0</p>
          </CardContent>
        </Card>

        <Card className="bg-[#13131A] border-[#2A2A35] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#94A3B8] font-medium">Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#94A3B8]">Coming soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Link href={bioUrl} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 hover:opacity-90">
            <ExternalLink className="w-4 h-4 mr-2" />
            View your Snapbio
          </Button>
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
    <Button
      onClick={handleCopy}
      className="rounded-full bg-[#13131A] hover:bg-[#1A1A22] border border-[#2A2A35]"
    >
      {copied ? (
        <Check className="w-4 h-4 mr-2 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 mr-2" />
      )}
      {copied ? "Copied!" : "Copy link"}
    </Button>
  );
}
