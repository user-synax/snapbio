
"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function BillingClient({ user, subscription }) {
  const [promoCode, setPromoCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeem = async (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setIsRedeeming(true);
    try {
      const response = await fetch("/api/promo-codes/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim() }),
      });

      if (response.ok) {
        toast.success("Promo code redeemed successfully!");
        // Reload page to show updated status
        window.location.reload();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to redeem promo code");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1
          className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
          style={{ letterSpacing: "-1.0px" }}
        >
          Billing
        </h1>
        <p
          className="text-[#999999] mt-2"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "15px",
            letterSpacing: "-0.15px",
            lineHeight: "1.30",
          }}
        >
          Manage your subscription and redeem promo codes.
        </p>
      </div>

      {/* Subscription Status Card */}
      <div className="bg-[#141414] rounded-[20px] p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-6 h-6 text-white" />
          <h2
            className={`${plusJakarta.className} text-xl font-bold text-white`}
            style={{ letterSpacing: "-0.5px" }}
          >
            Subscription Status
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-[#999999]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: "-0.14px",
                lineHeight: "1.40",
              }}
            >
              Plan
            </p>
            <p
              className={`${plusJakarta.className} text-2xl font-bold text-white mt-1`}
              style={{ letterSpacing: "-0.5px" }}
            >
              {user.isPro ? (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#22c55e]" />
                  Pro
                </span>
              ) : (
                "Free"
              )}
            </p>
          </div>

          {subscription && (
            <div className="text-right">
              <p
                className="text-[#999999]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "-0.14px",
                  lineHeight: "1.40",
                }}
              >
                Expires on
              </p>
              <p
                className={`${plusJakarta.className} text-lg font-semibold text-white mt-1`}
                style={{ letterSpacing: "-0.3px" }}
              >
                {new Date(subscription.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Promo Code Redemption Card */}
      <div className="bg-[#141414] rounded-[20px] p-6">
        <h2
          className={`${plusJakarta.className} text-xl font-bold text-white mb-4`}
          style={{ letterSpacing: "-0.5px" }}
        >
          Redeem a Promo Code
        </h2>

        <form onSubmit={handleRedeem} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter your promo code"
            className="flex-1 px-4 py-3 rounded-full bg-[#1c1c1c] text-white placeholder-[#666666] border border-[#262626] focus:outline-none focus:border-white/30"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              letterSpacing: "-0.14px",
              lineHeight: "1.40",
            }}
          />
          <button
            type="submit"
            disabled={isRedeeming || !promoCode.trim()}
            className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 md:w-auto w-full"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              letterSpacing: "-0.14px",
              lineHeight: "1.0",
            }}
          >
            {isRedeeming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Redeem"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
