"use client";

import { useState, useCallback, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { toast } from "sonner";
import { Camera, Check, X } from "lucide-react";

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
                    name: user.name,
                    username: user.username,
                    bio: user.bio,
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
        <Card className="bg-[#13131A] border-[#2A2A35] rounded-xl">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white">
                    Profile
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar upload */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <img
                                src={user.avatarUrl || user.image}
                                alt={user.name}
                                className="w-20 h-20 rounded-full object-cover"
                            />
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

                    {/* Name input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Display Name
                        </label>
                        <Input
                            value={user.name}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-full focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                        />
                    </div>

                    {/* Username input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Username
                        </label>
                        <div className="relative">
                            <Input
                                value={user.username}
                                onChange={(e) =>
                                    setUser((prev) => ({
                                        ...prev,
                                        username: e.target.value.toLowerCase(),
                                    }))
                                }
                                className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-full pr-10 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {usernameStatus === "available" && (
                                    <Check className="w-5 h-5 text-green-400" />
                                )}
                                {(usernameStatus === "taken" ||
                                    usernameStatus === "invalid") && (
                                    <X className="w-5 h-5 text-red-400" />
                                )}
                            </div>
                        </div>
                        {usernameStatus === "taken" && (
                            <p className="text-xs text-red-400">
                                Username is already taken
                            </p>
                        )}
                        {usernameStatus === "invalid" && (
                            <p className="text-xs text-red-400">
                                Username must be 3-20 lowercase letters,
                                numbers, or underscores
                            </p>
                        )}
                    </div>

                    {/* Bio textarea */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-white">
                                Bio
                            </label>
                            <span className="text-xs text-[#94A3B8]">
                                {user.bio?.length || 0}/160
                            </span>
                        </div>
                        <Textarea
                            value={user.bio || ""}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    bio: e.target.value.slice(0, 160),
                                }))
                            }
                            maxLength={160}
                            className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-xl focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] resize-none"
                            rows={4}
                        />
                    </div>

                    {/* Save button */}
                    <Button
                        type="submit"
                        disabled={
                            isSaving ||
                            (usernameStatus !== "idle" &&
                                usernameStatus !== "available")
                        }
                        className="w-full rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 hover:opacity-90"
                    >
                        {isSaving ? "Saving..." : "Save changes"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
