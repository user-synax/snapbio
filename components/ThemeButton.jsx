"use client";

import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ThemeButton({
    href,
    children,
    buttonBg,
    buttonHoverBg,
    buttonText,
    buttonHoverShadow,
    shadowColor,
    focusRing,
    buttonRadius,
    onClick,
    icon: IconComponent,
}) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={`${inter.className} flex items-center justify-center gap-3 w-full px-4 py-3 text-center font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
            style={{
                background: buttonBg,
                color: buttonText,
                fontSize: "14px",
                letterSpacing: "-0.14px",
                lineHeight: "1.0",
                boxShadow: `0 2px 8px ${shadowColor}`,
                outline: "none",
                borderRadius: buttonRadius || "20px",
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = buttonBg;
                e.currentTarget.style.boxShadow = `0 2px 8px ${shadowColor}`;
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = buttonHoverBg;
                e.currentTarget.style.boxShadow = buttonHoverShadow;
            }}
            onFocus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 3px ${focusRing}`;
            }}
            onBlur={(e) => {
                e.currentTarget.style.boxShadow = `0 2px 8px ${shadowColor}`;
            }}
        >
            {IconComponent && <IconComponent className="w-5 h-5" />}
            {children}
        </Link>
    );
}
