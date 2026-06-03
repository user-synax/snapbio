import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ArrowRight } from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-[#0A0A0F] text-white min-h-screen`}
            >
                {/* Navbar */}
                <nav className="sticky top-0 z-50 bg-[#0A0A0F] border-b border-[#2A2A35]">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <span
                                className={`${plusJakarta.className} text-2xl font-bold tracking-tight`}
                            >
                                Snapbio
                            </span>
                            <span
                                className="w-2 h-2 rounded-full bg-[linear-gradient(135deg,#7C3AED_0%,#EC4899_100%)]"
                            />
                        </Link>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/auth/signin"
                                className="px-5 py-2 rounded-full bg-[#13131A] border border-[#2A2A35] text-sm font-medium hover:bg-[#1A1A22] transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/auth/signin"
                                className="px-5 py-2 rounded-full bg-[#7C3AED] text-sm font-semibold hover:opacity-90 transition-opacity"
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>
                </nav>

                <main>
                    {/* Hero Section */}
                    <section className="py-24 px-6">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <h1
                                className={`${plusJakarta.className} text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter`}
                                style={{ letterSpacing: "-0.05em" }}
                            >
                                Your entire online presence.
                                <br />
                                One beautiful link.
                            </h1>
                            <p className="text-[#94A3B8] text-base sm:text-lg md:text-xl max-w-lg mx-auto">
                                Build a stunning bio link page that looks great
                                on every device — in minutes.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                                <Link
                                    href="/auth/signin"
                                    className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#7C3AED] text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                >
                                    Join Now
                                </Link>
                                <Link
                                    href="/demo"
                                    className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#13131A] border border-[#2A2A35] text-lg font-medium hover:bg-[#1A1A22] transition-colors"
                                >
                                    See an example
                                </Link>
                            </div>

                            {/* Mock Browser Window */}
                            <div className="mt-16 max-w-2xl mx-auto w-full">
                                <div className="bg-[#13131A] rounded-t-xl border border-[#2A2A35] p-3 flex items-center gap-2">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="flex-1 mx-2 sm:mx-4">
                                        <div className="bg-[#0A0A0F] rounded-full px-4 py-1 text-xs text-[#94A3B8] text-center truncate">
                                            snapbio.usersynax.dev/demo
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="border-x border-b border-[#2A2A35] rounded-b-xl p-6 sm:p-8"
                                    style={{ backgroundColor: "#0A0A0F" }}
                                >
                                    <div className="max-w-xs mx-auto text-center space-y-6">
                                        {/* Mock Profile */}
                                        <div className="relative inline-block">
                                            <div className="absolute -inset-1 rounded-full blur-md opacity-50" style={{
                                                background: "linear-gradient(135deg,#7C3AED_0%,#EC4899_100%)"
                                            }} />
                                            <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#2A2A35] border-2 border-[#2A2A35]" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3
                                                className={`${plusJakarta.className} text-lg sm:text-xl font-bold`}
                                            >
                                                Alex Chen
                                            </h3>
                                            <p className="text-[#94A3B8] text-sm">
                                                @demo
                                            </p>
                                        </div>
                                        <p className="text-[#94A3B8] text-sm">
                                            Designer &amp; Developer
                                        </p>
                                        <div className="space-y-3">
                                            <div
                                                className="px-6 py-3 rounded-full font-medium bg-[#EC4899]"
                                            >
                                                Portfolio
                                            </div>
                                            <div
                                                className="px-6 py-3 rounded-full font-medium bg-[#EC4899]"
                                            >
                                                Twitter / X
                                            </div>
                                            <div
                                                className="px-6 py-3 rounded-full font-medium bg-[#EC4899]"
                                            >
                                                GitHub
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-24 px-6">
                        <div className="max-w-7xl mx-auto">
                            <h2
                                className={`${plusJakarta.className} text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-12 text-center`}
                                style={{ letterSpacing: "-0.04em" }}
                            >
                                Everything you need
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Feature Card 1: Gradient Spotlight */}
                                <div className="relative overflow-hidden rounded-2xl p-8">
                                    <div
                                        className="absolute inset-0 opacity-80"
                                        style={{
                                            background: "linear-gradient(135deg,#7C3AED_0%,#EC4899_50%,#F59E0B_100%)",
                                        }}
                                    />
                                    <div
                                        className="absolute inset-0 opacity-50"
                                        style={{
                                            background:
                                                "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
                                        }}
                                    />
                                    <div className="relative z-10">
                                        <h3
                                            className={`${plusJakarta.className} text-xl font-bold mb-3`}
                                        >
                                            Link Builder
                                        </h3>
                                        <p className="text-white/90">
                                            Drag, reorder, and customize your
                                            links with our intuitive builder.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature Card 2: Surface */}
                                <div className="bg-[#13131A] border border-[#2A2A35] rounded-2xl p-8">
                                    <h3
                                        className={`${plusJakarta.className} text-xl font-bold mb-3 text-white`}
                                    >
                                        Beautiful Themes
                                    </h3>
                                    <p className="text-[#94A3B8]">
                                        Choose from free and Pro themes to match
                                        your brand.
                                    </p>
                                </div>

                                {/* Feature Card 3: Surface */}
                                <div className="bg-[#13131A] border border-[#2A2A35] rounded-2xl p-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3
                                            className={`${plusJakarta.className} text-xl font-bold text-white`}
                                        >
                                            Click Analytics
                                        </h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#0A0A0F] border border-[#2A2A35] text-violet-400">
                                            Pro
                                        </span>
                                    </div>
                                    <p className="text-[#94A3B8]">
                                        Get detailed insights into how your
                                        links are performing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Themes Showcase */}
                    <section className="py-24 px-6">
                        <div className="max-w-7xl mx-auto">
                            <h2
                                className={`${plusJakarta.className} text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-12 text-center`}
                                style={{ letterSpacing: "-0.04em" }}
                            >
                                Pick your vibe
                            </h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
                                {[
                                    {
                                        name: "Default",
                                        bg: "#0A0A0F",
                                        card: "#13131A",
                                        accent: "#7C3AED",
                                    },
                                    {
                                        name: "Midnight",
                                        bg: "#060611",
                                        card: "#0F0F1A",
                                        accent: "#3B82F6",
                                    },
                                    {
                                        name: "Slate",
                                        bg: "#0F0F0F",
                                        card: "#1A1A1A",
                                        accent: "#FFFFFF",
                                    },
                                    {
                                        name: "Aurora",
                                        bg: "#061108",
                                        card: "#0F1F12",
                                        accent: "#10B981",
                                    },
                                    {
                                        name: "Ember",
                                        bg: "#110606",
                                        card: "#1F0F0F",
                                        accent: "#EF4444",
                                    },
                                ].map((theme, index) => (
                                    <div
                                        key={index}
                                        className="min-w-[200px] sm:min-w-[240px] snap-start bg-[#13131A] border border-[#2A2A35] rounded-2xl p-6"
                                    >
                                        <div
                                            className="w-full aspect-video rounded-lg mb-4 relative overflow-hidden"
                                            style={{
                                                backgroundColor: theme.bg,
                                            }}
                                        >
                                            <div
                                                className="absolute bottom-0 left-0 right-0 h-1/2"
                                                style={{ backgroundColor: theme.card }}
                                            />
                                            <div
                                                className="absolute bottom-4 left-4 right-4 h-2 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        theme.accent,
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-[#94A3B8]">
                                            {theme.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section className="py-24 px-6">
                        <div className="max-w-5xl mx-auto">
                            <h2
                                className={`${plusJakarta.className} text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-12 text-center`}
                                style={{ letterSpacing: "-0.04em" }}
                            >
                                Simple pricing
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Free Plan */}
                                <div className="bg-[#13131A] border border-[#2A2A35] rounded-2xl p-8">
                                    <div className="mb-6">
                                        <h3
                                            className={`${plusJakarta.className} text-2xl font-bold mb-2 text-white`}
                                        >
                                            Free
                                        </h3>
                                        <p className="text-[#94A3B8]">
                                            Perfect for getting started
                                        </p>
                                        <div className="mt-4 flex items-baseline gap-1">
                                            <span
                                                className={`${plusJakarta.className} text-4xl font-extrabold text-white`}
                                            >
                                                $0
                                            </span>
                                            <span className="text-[#94A3B8]">
                                                /month
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-3 text-[#94A3B8]">
                                            <div className="w-5 h-5 rounded-full border border-[#2A2A35] flex items-center justify-center shrink-0">
                                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                            </div>
                                            Up to 5 links
                                        </li>
                                        <li className="flex items-center gap-3 text-[#94A3B8]">
                                            <div className="w-5 h-5 rounded-full border border-[#2A2A35] flex items-center justify-center shrink-0">
                                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                            </div>
                                            3 free themes
                                        </li>
                                        <li className="flex items-center gap-3 text-[#94A3B8]">
                                            <div className="w-5 h-5 rounded-full border border-[#2A2A35] shrink-0" />
                                            Basic customization
                                        </li>
                                    </ul>
                                    <Link
                                        href="/auth/signin"
                                        className="w-full py-3 px-4 rounded-full bg-[#0A0A0F] border border-[#2A2A35] text-center font-semibold hover:bg-[#1A1A22] transition-colors"
                                    >
                                        Get started
                                    </Link>
                                </div>

                                {/* Pro Plan */}
                                <div className="relative overflow-hidden rounded-2xl p-8">
                                    <div
                                        className="absolute inset-0 opacity-80"
                                        style={{
                                            background: "linear-gradient(135deg,#7C3AED_0%,#EC4899_100%)",
                                        }}
                                    />
                                    <div
                                        className="absolute inset-0 opacity-50"
                                        style={{
                                            background:
                                                "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
                                        }}
                                    />
                                    <div className="relative z-10">
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3
                                                    className={`${plusJakarta.className} text-2xl font-bold`}
                                                >
                                                    Pro
                                                </h3>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">
                                                    Most popular
                                                </span>
                                            </div>
                                            <p className="text-white/90">
                                                For serious creators
                                            </p>
                                            <div className="mt-4 flex items-baseline gap-1">
                                                <span
                                                    className={`${plusJakarta.className} text-4xl font-extrabold text-white`}
                                                >
                                                    $9
                                                </span>
                                                <span className="text-white/90">
                                                    /month
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="space-y-3 mb-8">
                                            <li className="flex items-center gap-3 text-white/90">
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                    <div className="w-3 h-3 rounded-full bg-white" />
                                                </div>
                                                Unlimited links
                                            </li>
                                            <li className="flex items-center gap-3 text-white/90">
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                    <div className="w-3 h-3 rounded-full bg-white" />
                                                </div>
                                                All 10 themes
                                            </li>
                                            <li className="flex items-center gap-3 text-white/90">
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                    <div className="w-3 h-3 rounded-full bg-white" />
                                                </div>
                                                Click analytics
                                            </li>
                                            <li className="flex items-center gap-3 text-white/90">
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                    <div className="w-3 h-3 rounded-full bg-white" />
                                                </div>
                                                Advanced customization
                                            </li>
                                        </ul>
                                        <Link
                                            href="/dashboard/billing"
                                            className="w-full py-3 px-4 rounded-full bg-white text-violet-700 text-center font-semibold hover:bg-white/90 transition-colors"
                                        >
                                            Upgrade to Pro
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-[#0A0A0F] border-t border-[#2A2A35] py-8 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <span
                                className={`${plusJakarta.className} text-xl font-bold tracking-tight`}
                            >
                                Snapbio
                            </span>
                        </Link>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Link
                                href="https://github.com/usersynax/snapbio"
                                className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                            >
                                GitHub
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                            >
                                Terms
                            </Link>
                        </div>
                        <p className="text-xs text-[#94A3B8]">
                            Built by usersynax.dev
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
