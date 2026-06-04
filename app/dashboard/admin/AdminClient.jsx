
"use client";

import { useState, useEffect } from "react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Shield, Users, Gift, Check, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState("promocodes");
  const [users, setUsers] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, promoRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/promo-codes"),
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }
      if (promoRes.ok) {
        const promoData = await promoRes.json();
        setPromoCodes(promoData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreatePromoCode = async () => {
    try {
      setCreating(true);
      const response = await fetch("/api/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Promo code created!");
        fetchData();
      } else {
        toast.error("Failed to create promo code");
      }
    } catch (error) {
      console.error("Error creating promo code:", error);
      toast.error("Failed to create promo code");
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1
          className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
          style={{ letterSpacing: "-1.0px" }}
        >
          Admin Dashboard
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
          Manage users and promo codes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("promocodes")}
          className={`px-4 py-2 rounded-full transition-colors ${
            activeTab === "promocodes"
              ? "bg-white text-black"
              : "bg-[#141414] text-[#999999] hover:text-white hover:bg-[#1c1c1c]"
          }`}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "-0.14px",
            lineHeight: "1.40",
          }}
        >
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Promo Codes
          </div>
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-full transition-colors ${
            activeTab === "users"
              ? "bg-white text-black"
              : "bg-[#141414] text-[#999999] hover:text-white hover:bg-[#1c1c1c]"
          }`}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "-0.14px",
            lineHeight: "1.40",
          }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </div>
        </button>
      </div>

      {activeTab === "promocodes" && (
        <div className="space-y-6">
          {/* Create Promo Code Card */}
          <div className="bg-[#141414] rounded-[20px] p-6">
            <h2
              className={`${plusJakarta.className} text-xl font-bold text-white mb-4`}
              style={{ letterSpacing: "-0.5px" }}
            >
              Create Promo Code
            </h2>
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="px-4 py-3 rounded-full bg-[#1c1c1c] text-white border border-[#262626] focus:outline-none focus:border-white/30"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  letterSpacing: "-0.14px",
                  lineHeight: "1.40",
                }}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </select>
              <button
                onClick={handleCreatePromoCode}
                disabled={creating}
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  letterSpacing: "-0.14px",
                  lineHeight: "1.0",
                }}
              >
                {creating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>

          {/* Promo Codes List */}
          <div className="bg-[#141414] rounded-[20px] p-6">
            <h2
              className={`${plusJakarta.className} text-xl font-bold text-white mb-4`}
              style={{ letterSpacing: "-0.5px" }}
            >
              All Promo Codes
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#262626]">
                      <th
                        className="text-left py-3 px-2 text-[#999999] font-medium"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "13px",
                          letterSpacing: "-0.13px",
                          lineHeight: "1.30",
                        }}
                      >
                        Code
                      </th>
                      <th
                        className="text-left py-3 px-2 text-[#999999] font-medium"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "13px",
                          letterSpacing: "-0.13px",
                          lineHeight: "1.30",
                        }}
                      >
                        Plan
                      </th>
                      <th
                        className="text-left py-3 px-2 text-[#999999] font-medium"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "13px",
                          letterSpacing: "-0.13px",
                          lineHeight: "1.30",
                        }}
                      >
                        Status
                      </th>
                      <th
                        className="text-left py-3 px-2 text-[#999999] font-medium"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "13px",
                          letterSpacing: "-0.13px",
                          lineHeight: "1.30",
                        }}
                      >
                        Redeemed By
                      </th>
                      <th
                        className="text-left py-3 px-2 text-[#999999] font-medium"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "13px",
                          letterSpacing: "-0.13px",
                          lineHeight: "1.30",
                        }}
                      >
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((code) => (
                      <tr key={code._id} className="border-b border-[#262626]">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <code
                              className="px-3 py-1 bg-[#1c1c1c] rounded-lg text-white font-mono"
                              style={{ fontSize: "13px" }}
                            >
                              {code.code}
                            </code>
                            <button
                              onClick={() => copyToClipboard(code.code)}
                              className="p-1 hover:bg-[#262626] rounded-lg transition-colors"
                            >
                              <Copy className="w-4 h-4 text-[#999999]" />
                            </button>
                          </div>
                        </td>
                        <td
                          className="py-4 px-2 text-white capitalize"
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "14px",
                            letterSpacing: "-0.14px",
                            lineHeight: "1.40",
                          }}
                        >
                          {code.plan}
                        </td>
                        <td className="py-4 px-2">
                          {code.isRedeemed ? (
                            <span className="text-[#f97316] flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              <span
                                style={{
                                  fontFamily: "var(--font-inter)",
                                  fontSize: "14px",
                                  letterSpacing: "-0.14px",
                                  lineHeight: "1.40",
                                }}
                              >
                                Redeemed
                              </span>
                            </span>
                          ) : (
                            <span className="text-[#22c55e] flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              <span
                                style={{
                                  fontFamily: "var(--font-inter)",
                                  fontSize: "14px",
                                  letterSpacing: "-0.14px",
                                  lineHeight: "1.40",
                                }}
                              >
                                Available
                              </span>
                            </span>
                          )}
                        </td>
                        <td
                          className="py-4 px-2 text-[#999999]"
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "14px",
                            letterSpacing: "-0.14px",
                            lineHeight: "1.40",
                          }}
                        >
                          {code.redeemedBy?.name || "-"}
                        </td>
                        <td
                          className="py-4 px-2 text-[#999999]"
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "14px",
                            letterSpacing: "-0.14px",
                            lineHeight: "1.40",
                          }}
                        >
                          {new Date(code.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-[#141414] rounded-[20px] p-6">
          <h2
            className={`${plusJakarta.className} text-xl font-bold text-white mb-4`}
            style={{ letterSpacing: "-0.5px" }}
          >
            All Users
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#262626]">
                    <th
                      className="text-left py-3 px-2 text-[#999999] font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "13px",
                        letterSpacing: "-0.13px",
                        lineHeight: "1.30",
                      }}
                    >
                      Name
                    </th>
                    <th
                      className="text-left py-3 px-2 text-[#999999] font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "13px",
                        letterSpacing: "-0.13px",
                        lineHeight: "1.30",
                      }}
                    >
                      Email
                    </th>
                    <th
                      className="text-left py-3 px-2 text-[#999999] font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "13px",
                        letterSpacing: "-0.13px",
                        lineHeight: "1.30",
                      }}
                    >
                      Username
                    </th>
                    <th
                      className="text-left py-3 px-2 text-[#999999] font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "13px",
                        letterSpacing: "-0.13px",
                        lineHeight: "1.30",
                      }}
                    >
                      Status
                    </th>
                    <th
                      className="text-left py-3 px-2 text-[#999999] font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "13px",
                        letterSpacing: "-0.13px",
                        lineHeight: "1.30",
                      }}
                    >
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-[#262626]">
                      <td
                        className="py-4 px-2 text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "14px",
                          letterSpacing: "-0.14px",
                          lineHeight: "1.40",
                        }}
                      >
                        {user.name}
                      </td>
                      <td
                        className="py-4 px-2 text-[#999999]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "14px",
                          letterSpacing: "-0.14px",
                          lineHeight: "1.40",
                        }}
                      >
                        {user.email}
                      </td>
                      <td
                        className="py-4 px-2 text-[#999999]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "14px",
                          letterSpacing: "-0.14px",
                          lineHeight: "1.40",
                        }}
                      >
                        @{user.username || "-"}
                      </td>
                      <td className="py-4 px-2">
                        {user.isPro ? (
                          <span className="text-[#22c55e] flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            <span
                              style={{
                                fontFamily: "var(--font-inter)",
                                fontSize: "14px",
                                letterSpacing: "-0.14px",
                                lineHeight: "1.40",
                              }}
                            >
                              Pro
                            </span>
                          </span>
                        ) : (
                          <span className="text-[#999999] flex items-center gap-1">
                            <span
                              style={{
                                fontFamily: "var(--font-inter)",
                                fontSize: "14px",
                                letterSpacing: "-0.14px",
                                lineHeight: "1.40",
                              }}
                            >
                              Free
                            </span>
                          </span>
                        )}
                      </td>
                      <td
                        className="py-4 px-2 text-[#999999]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "14px",
                          letterSpacing: "-0.14px",
                          lineHeight: "1.40",
                        }}
                      >
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
