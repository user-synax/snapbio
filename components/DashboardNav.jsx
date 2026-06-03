"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, BarChart3, CreditCard, Settings } from "lucide-react";

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

export function DesktopNav({ isPro }) {
    const pathname = usePathname();
    return (
        <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
                <NavLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    isPro={isPro}
                />
            ))}
        </nav>
    );
}

export function MobileNav({ isPro }) {
    const pathname = usePathname();
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0F] border-t border-[#2A2A35] z-50 px-2 py-3">
            <div className="flex justify-around">
                {navItems.map((item) => (
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
          ${isMobile ? "flex flex-col items-center gap-1 py-1 px-3" : "flex items-center gap-3 px-4 py-3 rounded-lg"}
          ${isActive ? "bg-violet-500/10 text-violet-400" : "text-[#94A3B8] hover:text-white hover:bg-white/5"}
          transition-colors
        `}
            >
                <item.icon className={isMobile ? "w-5 h-5" : "w-5 h-5"} />
                {!isMobile && (
                    <span className="font-medium text-sm flex items-center gap-2">
                        {item.label}
                        {item.pro && !isPro && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#13131A] border border-[#2A2A35] text-violet-400">
                                Pro
                            </span>
                        )}
                    </span>
                )}
            </Link>
            {item.pro && !isPro && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block">
                    <div className="bg-[#13131A] border border-[#2A2A35] rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap z-50">
                        Analytics is a Pro feature
                    </div>
                </div>
            )}
        </div>
    );
}
