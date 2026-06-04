
"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Loader2 } from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "An error occurred during sign up");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        signIn("credentials", {
          email, password, redirect: true, callbackUrl: "/"
        });
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`${inter.className} bg-[#090909] min-h-screen flex items-center justify-center px-4 py-12`}
    >
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
            Sign up
          </h1>
          <p className="text-[#999999] mb-8">
            Create an account to get started.
          </p>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg p-3 mb-6 text-sm">
              {error}
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Account created!</h3>
              <p className="text-[#999999]">Signing you in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#141414] text-white placeholder-[#999999] border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#141414] text-white placeholder-[#999999] border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#141414] text-white placeholder-[#999999] border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#141414] text-white placeholder-[#999999] border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
          )}

          {!isSuccess && (
            <>
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-[#262626]" />
                <span className="text-[#999999] text-sm">or continue with</span>
                <div className="flex-1 h-px bg-[#262626]" />
              </div>

              <button
                onClick={() => signIn("google")}
                className="w-full py-3 px-4 rounded-full bg-[#1c1c1c] text-white border border-[#262626] font-medium hover:bg-[#262626] transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="text-center mt-6 text-[#999999] text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-[#0099ff] hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
