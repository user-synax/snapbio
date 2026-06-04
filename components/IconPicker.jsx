
"use client";

import { useState, useEffect, useMemo } from "react";
import * as faIcons from "react-icons/fa";
import { Search, X } from "lucide-react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

// Get all icon names (without "Fa" prefix for display)
const allIconNames = Object.keys(faIcons)
  .filter((key) => key.startsWith("Fa"))
  .map((key) => key.slice(2))
  .sort();

export default function IconPicker({
  selectedIcon,
  onSelectIcon,
  onClearIcon,
  isOpen,
  onClose,
}) {
  const [search, setSearch] = useState("");
  const [visibleIcons, setVisibleIcons] = useState(60); // Lazy load more as needed

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    if (!search) return allIconNames;
    const searchLower = search.toLowerCase();
    return allIconNames.filter((name) =>
      name.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const displayedIcons = filteredIcons.slice(0, visibleIcons);

  // Reset state when picker opens/closes
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setVisibleIcons(60);
    }
  }, [isOpen]);

  // Load more icons when scrolling to bottom
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setVisibleIcons((prev) => Math.min(prev + 60, filteredIcons.length));
    }
  };

  const SelectedIconComponent = selectedIcon
    ? faIcons[`Fa${selectedIcon}`]
    : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-[#141414] rounded-[20px] border border-[#262626] w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#262626]">
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`${plusJakarta.className} text-xl font-bold text-white`}
              style={{ letterSpacing: "-1.0px" }}
            >
              Choose an icon
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#1c1c1c] transition-colors"
            >
              <X className="w-5 h-5 text-[#999999]" />
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
            <input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#090909] text-white placeholder:text-[#666666] border border-[#262626] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "15px",
                letterSpacing: "-0.15px",
                lineHeight: "1.30",
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="px-6 py-4 border-b border-[#262626]">
          <p
            className="text-sm font-medium text-[#999999] mb-3"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              letterSpacing: "-0.13px",
              lineHeight: "1.20",
            }}
          >
            Preview
          </p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[12px] bg-[#090909] flex items-center justify-center border border-[#262626]">
              {SelectedIconComponent ? (
                <SelectedIconComponent className="w-8 h-8 text-white" />
              ) : (
                <div className="w-8 h-8 rounded border-2 border-dashed border-[#333333]" />
              )}
            </div>
            <div className="flex-1">
              <p
                className="text-white font-medium"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  letterSpacing: "-0.15px",
                  lineHeight: "1.30",
                }}
              >
                {selectedIcon || "No icon selected"}
              </p>
              <p
                className="text-[#999999]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  letterSpacing: "-0.13px",
                  lineHeight: "1.20",
                }}
              >
                {selectedIcon
                  ? "Click an icon to change, or clear to remove"
                  : "Select an icon from the grid below"}
              </p>
            </div>
            {selectedIcon && (
              <button
                onClick={onClearIcon}
                className="px-4 py-2 rounded-full bg-[#141414] text-red-400 font-medium hover:bg-red-500/10 transition-colors border border-red-500/20"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  letterSpacing: "-0.13px",
                  lineHeight: "1.20",
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Icon Grid */}
        <div
          className="flex-1 overflow-y-auto p-6"
          onScroll={handleScroll}
        >
          {displayedIcons.length === 0 ? (
            <div className="text-center py-12">
              <p
                className="text-[#666666]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  letterSpacing: "-0.15px",
                  lineHeight: "1.30",
                }}
              >
                No icons found for `{search}`
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
              {displayedIcons.map((iconName) => {
                const IconComponent = faIcons[`Fa${iconName}`];
                const isSelected = selectedIcon === iconName;
                return (
                  <button
                    key={iconName}
                    onClick={() => {
                      onSelectIcon(iconName);
                    }}
                    className={`aspect-square rounded-[10px] flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#0099ff] text-white ring-2 ring-[#0099ff]/30"
                        : "bg-[#090909] text-[#999999] hover:bg-[#1c1c1c] hover:text-white border border-[#262626]"
                    }`}
                    title={iconName}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#262626] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-[#141414] text-white font-medium hover:bg-[#1c1c1c] transition-colors border border-[#262626]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              letterSpacing: "-0.14px",
              lineHeight: "1.0",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

