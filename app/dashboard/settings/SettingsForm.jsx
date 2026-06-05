"use client";

import { useState, useCallback, useEffect } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Camera, Check, X, LogOut } from "lucide-react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { getRandomEmoji, getAvatarBgColor } from "../../../lib/avatar";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export default function SettingsForm({ user: initialUser }) {
    const [user, setUser] = useState(initialUser);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [usernameStatus, setUsernameStatus] = useState("idle");
    const [debounceTimer, setDebounceTimer] = useState(null);

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/user/avatar", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setUser((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
                toast.success("Avatar updated!");
            } else {
                toast.error(data.error || "Failed to upload avatar");
            }
        } catch (error) {
            toast.error("Failed to upload avatar");
        } finally {
            setIsUploading(false);
        }
    };

    const checkUsernameAvailability = useCallback(
        async (username) => {
            if (!username) {
                setUsernameStatus("idle");
                return;
            }

            if (username === initialUser.username) {
                setUsernameStatus("idle");
                return;
            }

            if (!USERNAME_REGEX.test(username)) {
                setUsernameStatus("invalid");
                return;
            }

            try {
                const res = await fetch(
                    `/api/username/check?q=${encodeURIComponent(username)}`,
                );
                const data = await res.json();
                setUsernameStatus(data.available ? "available" : "taken");
            } catch (error) {
                setUsernameStatus("invalid");
            }
        },
        [initialUser.username],
    );

    useEffect(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
        const timer = setTimeout(
            () => checkUsernameAvailability(user.username),
            500,
        );
        setDebounceTimer(timer);
        return () => clearTimeout(timer);
    }, [user.username, checkUsernameAvailability]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameStatus === "taken" || usernameStatus === "invalid") {
            return;
        }
        setIsSaving(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: user.username,
                }),
            });
            if (res.ok) {
                toast.success("Profile saved!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to save profile");
            }
        } catch (error) {
            toast.error("Failed to save profile");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-[#141414] rounded-[20px] p-6 border border-[#262626]">
            <h2 className={`${plusJakarta.className} text-xl font-bold text-white mb-6`} style={{ letterSpacing: "-1.0px" }}>
                Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar upload */}
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        {user.avatarUrl || user.image ? (
                            <img
                                src={user.avatarUrl || user.image}
                                alt={user.name}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                                style={{ backgroundColor: getAvatarBgColor(user._id) }}
                            >
                                {getRandomEmoji(user._id)}
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            {isUploading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Camera className="w-6 h-6 text-white" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                                disabled={isUploading}
                            />
                        </label>
                    </div>
                </div>

                {/* Username input */}
                <div className="space-y-2">
                    <label className="text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        Username
                    </label>
                    <div className="relative">
                        <input
                            value={user.username}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    username: e.target.value.toLowerCase(),
                                }))
                            }
                            className="w-full px-4 py-3 bg-[#141414] text-white placeholder:text-[#999999] border border-[#262626] rounded-[10px] pr-10 focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                            style={{ fontFamily: "var(--font-inter)", fontSize: "15px", letterSpacing: "-0.15px", lineHeight: "1.30" }}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {usernameStatus === "available" && (
                                <Check className="w-5 h-5 text-[#22c55e]" />
                            )}
                            {(usernameStatus === "taken" ||
                                usernameStatus === "invalid") && (
                                <X className="w-5 h-5 text-red-400" />
                            )}
                        </div>
                    </div>
                    {usernameStatus === "taken" && (
                        <p className="text-red-400" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: "400", letterSpacing: "-0.12px", lineHeight: "1.20" }}>
                            Username is already taken
                        </p>
                    )}
                    {usernameStatus === "invalid" && (
                        <p className="text-red-400" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: "400", letterSpacing: "-0.12px", lineHeight: "1.20" }}>
                            Username must be 3-20 lowercase letters,
                            numbers, or underscores
                        </p>
                    )}
                </div>

                {/* Save button */}
                <button
                    type="submit"
                    disabled={
                        isSaving ||
                        (usernameStatus !== "idle" &&
                            usernameStatus !== "available")
                    }
                    className="w-full px-4 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
                >
                    {isSaving ? "Saving..." : "Save changes"}
                </button>
            </form>

            {/* Logout section */}
            <div className="mt-8 pt-6 border-t border-[#262626]">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full px-4 py-3 rounded-full bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
                >
                    <LogOut className="w-5 h-5" />
                    Log out
                </button>
            </div>
        </div>
    );
}
