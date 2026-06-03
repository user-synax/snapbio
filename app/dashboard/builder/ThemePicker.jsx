
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Switch } from "../../../components/ui/switch";
import { themes } from "../../../lib/themes";

export default function ThemePicker({ currentTheme, isPro }) {
  const [loadingTheme, setLoadingTheme] = useState(null);

  const handleThemeSelect = async (themeId) => {
    const theme = themes.find((t) => t.id === themeId);

    if (theme.isPro && !isPro) {
      window.open("/dashboard/billing", "_self");
      return;
    }

    setLoadingTheme(themeId);
    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: themeId }),
      });

      if (res.ok) {
        toast.success("Theme updated!");
      } else {
        toast.error("Failed to update theme");
      }
    } catch (error) {
      toast.error("Failed to update theme");
    } finally {
      setLoadingTheme(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {themes.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <div key={theme.id} className="relative">
              <button
                onClick={() => handleThemeSelect(theme.id)}
                disabled={loadingTheme === theme.id}
                className={`
                  relative w-full aspect-square rounded-xl overflow-hidden
                  transition-all duration-200
                  ${isActive ? "ring-2 ring-violet-500 ring-offset-2 ring-offset-[#0A0A0F]" : ""}
                `}
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: theme.bgColor }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-xl"
                  style={{ backgroundColor: theme.cardColor }}
                />
                <div
                  className="absolute bottom-2 left-2 right-2 h-2 rounded-full"
                  style={{ background: theme.accentGradient }}
                />
                {theme.isPro && !isPro && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
              <p className="text-xs text-[#94A3B8] mt-1 text-center">
                {theme.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
