"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, BarChart3, CreditCard, Settings, Shield } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const navItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Layers, label: "Builder", href: "/dashboard/builder" },
    {
        icon: BarChart3,
        label: "Analytics",
        href: "/dashboard/analytics",
        pro: true,
    },
    { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DesktopNav({ isPro, isAdmin }) {
    const pathname = usePathname();
    return (
        <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
                <NavLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    isPro={isPro}
                />
            ))}
            {isAdmin && (
                <NavLink
                    item={{ icon: Shield, label: "Admin", href: "/dashboard/admin" }}
                    pathname={pathname}
                    isPro={isPro}
                />
            )}
        </nav>
    );
}

export function MobileNav({ isPro, isAdmin }) {
    const pathname = usePathname();
    
    const allNavItems = [...navItems];
    if (isAdmin) {
        allNavItems.push({ icon: Shield, label: "Admin", href: "/dashboard/admin" });
    }
    
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#090909] border-t border-[#262626] z-50 px-2 py-3">
            <div className="flex justify-around">
                {allNavItems.map((item) => (
                    <NavLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        isMobile
                        isPro={isPro}
                    />
                ))}
            </div>
        </nav>
    );
}

function NavLink({ item, pathname, isMobile, isPro }) {
    const isActive = pathname === item.href;

    return (
        <div className="relative group">
            <Link
                href={item.href}
                className={`
          ${isMobile ? "flex flex-col items-center gap-1 py-1 px-3" : "flex items-center gap-3 px-4 py-3 rounded-full"}
          ${isActive ? "bg-[#1c1c1c] text-white" : "text-[#999999] hover:text-white hover:bg-[#141414]"}
          transition-colors
        `}
            >
                <item.icon className={isMobile ? "w-5 h-5" : "w-5 h-5"} />
                {!isMobile && (
                    <span className={`font-medium text-sm flex items-center gap-2 ${inter.className}`} style={{ fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        {item.label}
                        {item.pro && !isPro && (
                            <span className={`text-xs px-3 py-1 rounded-full bg-[#141414] text-[#999999] ${inter.className}`} style={{ fontSize: "12px", fontWeight: "400", letterSpacing: "-0.12px", lineHeight: "1.20" }}>
                                Pro
                            </span>
                        )}
                    </span>
                )}
            </Link>
            {item.pro && !isPro && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block">
                    <div className="bg-[#141414] border border-[#262626] rounded-[10px] px-3 py-2 text-xs text-white whitespace-nowrap z-50" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: "400", letterSpacing: "-0.12px", lineHeight: "1.20" }}>
                        Analytics is a Pro feature
                    </div>
                </div>
            )}
        </div>
    );
}
