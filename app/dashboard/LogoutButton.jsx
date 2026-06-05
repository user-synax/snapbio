"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full px-4 py-3 rounded-full bg-[#141414] text-[#999999] hover:text-white hover:bg-[#1c1c1c] transition-colors flex items-center justify-center gap-2"
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "14px",
        letterSpacing: "-0.14px",
        lineHeight: "1.0",
      }}
    >
      <LogOut className="w-4 h-4" />
      Log out
    </button>
  );
}
