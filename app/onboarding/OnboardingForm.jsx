
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export default function OnboardingForm() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("idle"); // idle, checking, available, taken, invalid
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const checkUsername = useCallback(async (value) => {
    if (!value) {
      setStatus("idle");
      return;
    }

    if (!USERNAME_REGEX.test(value)) {
      setStatus("invalid");
      return;
    }

    setStatus("checking");

    try {
      const res = await fetch(`/api/username/check?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setStatus(data.available ? "available" : "taken");
    } catch {
      setStatus("invalid");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkUsername(username);
    }, 500);

    return () => clearTimeout(timer);
  }, [username, checkUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status !== "available") {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/user/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#13131A] border border-[#2A2A35] rounded-xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold text-white font-['Plus_Jakarta_Sans']">
            Claim your Snapbio
          </CardTitle>
          <p className="text-[#94A3B8] mt-2">
            Choose a unique username for your bio page
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="yourusername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-full py-6 px-4 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                  disabled={isSubmitting}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {status === "checking" && (
                    <div className="w-5 h-5 border-2 border-[#94A3B8] border-t-transparent rounded-full animate-spin" />
                  )}
                  {status === "available" && (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {status === "taken" && (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {status === "invalid" && (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-xs text-[#94A3B8]">
                3-20 characters, lowercase letters, numbers, and underscores only
              </p>
            </div>
            <Button
              type="submit"
              disabled={status !== "available" || isSubmitting}
              className="w-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 hover:opacity-90 text-white font-medium rounded-full py-6"
            >
              {isSubmitting ? "Saving..." : "Claim username"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
