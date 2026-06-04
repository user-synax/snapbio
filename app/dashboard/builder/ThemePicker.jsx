
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { themes } from "../../../lib/themes";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function ThemePicker({ currentTheme, isPro }) {
  const [loadingTheme, setLoadingTheme] = useState(null);
  const router = useRouter();

  const lightThemes = themes.filter(t => !t.id.startsWith("dark-"));
  const darkThemes = themes.filter(t => t.id.startsWith("dark-"));

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
        router.refresh();
      } else {
        toast.error("Failed to update theme");
      }
    } catch (error) {
      toast.error("Failed to update theme");
    } finally {
      setLoadingTheme(null);
    }
  };

  const renderThemeGrid = (themeList) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {themeList.map((theme) => {
        const isActive = currentTheme === theme.id;
        return (
          <div key={theme.id} className="relative">
            <button
              onClick={() => handleThemeSelect(theme.id)}
              disabled={loadingTheme === theme.id}
              className={`
                relative w-full aspect-square rounded-[20px] overflow-hidden
                transition-all duration-200
                ${isActive ? "ring-2 ring-[#0099ff] ring-offset-2 ring-offset-[#090909]" : ""}
              `}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `${theme.bgPattern}, ${theme.bgGradient}`,
                  backgroundSize: `${theme.bgPatternSize}, cover`,
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-[20px]"
                style={{ backgroundColor: theme.cardColor, opacity: 0.9 }}
              />
              <div
                className="absolute bottom-3 left-3 right-3 h-3 rounded-[9999px]"
                style={{ background: theme.accentGradient }}
              />
              {theme.isPro && !isPro && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
            <p className={`text-xs mt-2 text-center ${inter.className}`} style={{ color: "#999999", fontSize: "12px", letterSpacing: "-0.12px", lineHeight: "1.20" }}>
              {theme.name}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className={`${plusJakarta.className} text-xl font-semibold text-white`}>
          Light & Warm Themes
        </h3>
        {renderThemeGrid(lightThemes)}
      </div>
      <div className="space-y-4">
        <h3 className={`${plusJakarta.className} text-xl font-semibold text-white`}>
          Dark & Amber Themes
        </h3>
        {renderThemeGrid(darkThemes)}
      </div>
    </div>
  );
}
