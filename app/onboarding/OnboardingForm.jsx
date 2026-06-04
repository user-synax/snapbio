
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Loader2 } from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export default function OnboardingForm() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("idle"); // idle, checking, available, taken, invalid
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

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
        // Update the session with the new username
        await update({ username });
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
    <div className={`${inter.className} bg-[#090909] min-h-screen flex items-center justify-center px-4 py-12`}>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
          >
            Snapbio
          </Link>
        </div>

        <div className="bg-[#141414] rounded-[20px] p-8">
          <h1
            className={`${plusJakarta.className} text-2xl font-bold mb-2 text-white`}
          >
            Claim your Snapbio
          </h1>
          <p className="text-[#999999] mb-8">
            Choose a unique username for your bio page
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="yourusername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-[10px] bg-[#141414] text-white placeholder-[#999999] border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {status === "checking" && (
                    <Loader2 className="w-5 h-5 text-[#999999] animate-spin" />
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
              <p className="text-xs text-[#999999]">
                3-20 characters, lowercase letters, numbers, and underscores only
              </p>
            </div>

            <button
              type="submit"
              disabled={status !== "available" || isSubmitting}
              className="w-full py-3 px-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Claim username"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
