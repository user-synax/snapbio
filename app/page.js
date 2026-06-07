
import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ArrowRight } from "lucide-react";
import WaveBackground from "@/components/WaveBackground";
import HeroButton from "../components/aura/heroButton";
import PricingCard from "../components/aura/heroPricingCard";
import Footer from "../components/aura/footer";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <body
            className={`${inter.className} bg-[#0A0A0F] text-white min-h-screen`}
        >
            {/* Navbar */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] md:w-[80vw] max-w-6xl">
                <div className="bg-[#0A0A0F]/80 backdrop-blur-xl border border-[#2A2A35] rounded-full px-6 py-3 flex items-center justify-between">

                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <span
                            className={`${plusJakarta.className} text-2xl font-bold tracking-tight`}
                        >
                            Snapbio
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/auth/signin"
                            className="hidden md:inline-flex px-5 py-2 rounded-full bg-[#13131A] border border-[#2A2A35] text-sm font-medium hover:bg-[#1A1A22] transition-colors"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/auth/signup"
                            className="px-5 py-2 rounded-full bg-[#0099ff] text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            Create account
                        </Link>
                    </div>

                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="py-36 px-6 relative overflow-hidden">
                    <WaveBackground
                        className="absolute inset-0 z-0"
                        backdropBlurAmount="2xl"
                    />
                    <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                        <h1
                            className={`${plusJakarta.className} text-4xl sm:text-7xl md:text-7xl font-extrabold tracking-tighter text-gray-300`}
                        >
                            Your entire online presence.
                            <br />
                            One beautiful link.
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl max-w-lg mx-auto text-gray-400" style={{
                            textShadow: "0 1px 5px rgba(0,0,0,0.2)"
                        }}>
                            Build a stunning bio link page that looks great
                            on every device — in minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/auth/signin"
                                className="w-full sm:w-auto text-md font-semibold flex items-center justify-center gap-2"
                            >
                            <HeroButton />
                            </Link>
                            <Link
                                href="/demo"
                                className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#13131A] border border-[#2A2A35] text-md font-medium hover:bg-[#1A1A22] transition-colors"
                            >
                                See an example
                            </Link>
                        </div>

                        {/* Mock Browser Window */}
                        <div className="mt-20 max-w-2xl mx-auto w-full">
                            {/* Browser Top */}
                            <div
                                className="rounded-t-2xl border p-4 backdrop-blur-xl"
                                style={{
                                    background: "rgba(42,36,24,0.8)",
                                    borderColor: "#3a2e1e",
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#6b4e2c]" />
                                    <div className="w-3 h-3 rounded-full bg-[#a06d2c]" />
                                    <div className="w-3 h-3 rounded-full bg-[#d89848]" />

                                    <div className="flex-1 mx-4">
                                        <div
                                            className="rounded-full px-4 py-2 text-xs text-center"
                                            style={{
                                                background: "#201a12",
                                                color: "#a89888",
                                                border: "1px solid #3a2e1e",
                                            }}
                                        >
                                            snapbio.usersynax.dev/demo
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Browser Content */}
                            <div
                                className="rounded-b-2xl border-x border-b p-8"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#181410 0%,#121008 100%)",
                                    borderColor: "#3a2e1e",
                                }}
                            >
                                {/* Background Pattern */}
                                <div
                                    className="rounded-3xl border p-8 relative overflow-hidden"
                                    style={{
                                        background: "rgba(42,36,24,0.65)",
                                        borderColor: "#3a2e1e",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 opacity-20"
                                        style={{
                                            backgroundImage:
                                                "radial-gradient(circle,#d89848 1px,transparent 1px)",
                                            backgroundSize: "22px 22px",
                                        }}
                                    />

                                    <div className="relative max-w-xs mx-auto text-center">
                                        {/* Avatar */}
                                        <div className="relative inline-block">
                                            <div
                                                className="absolute inset-0 rounded-full blur-2xl opacity-60"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg,#d89848 0%,#e8a858 100%)",
                                                    transform: "scale(1.3)",
                                                }}
                                            />

                                            <img
                                                src="https://api.dicebear.com/9.x/notionists/svg?seed=Alex"
                                                alt="avatar"
                                                className="relative w-24 h-24 rounded-full border-2"
                                                style={{
                                                    borderColor: "#3a2e1e",
                                                    background: "#201a12",
                                                }}
                                            />
                                        </div>

                                        {/* Profile */}
                                        <div className="mt-5">
                                            <h3
                                                className={`${plusJakarta.className} text-2xl font-bold`}
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg,#d89848 0%,#e8a858 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                }}
                                            >
                                                Alex Chen
                                            </h3>

                                            <p className="text-sm mt-1 text-[#a89888]">
                                                @demo
                                            </p>

                                            <p className="text-sm mt-4 text-[#a89888] leading-relaxed">
                                                Designer & Developer crafting thoughtful
                                                digital experiences for the modern web.
                                            </p>
                                        </div>

                                        {/* Links */}
                                        <div className="mt-6 space-y-3">
                                            {["Portfolio", "Twitter / X", "GitHub"].map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center justify-between px-5 py-4 rounded-2xl transition-all"
                                                    style={{
                                                        background: "#201a12",
                                                        border: "1px solid #3a2e1e",
                                                    }}
                                                >
                                                    <span className="text-[#fff8e8] font-medium">
                                                        {item}
                                                    </span>

                                                    <span className="text-[#d89848]">
                                                        →
                                                    </span>
                                                </div>
                                            ))}
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
                            className={`${plusJakarta.className} text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] text-center mb-16`}
                        >
                            Everything you need
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">

                            {/* Large Builder Card */}
                            <div className="md:col-span-4 bg-[#141414] rounded-[30px] p-8 min-h-[320px] flex flex-col justify-between">
                                <div>
                                    <span className="text-[#999999] text-sm">
                                        Build
                                    </span>

                                    <h3
                                        className={`${plusJakarta.className} text-3xl mt-3 tracking-[-0.03em]`}
                                    >
                                        Drag & drop your perfect page
                                    </h3>
                                </div>

                                <div className="mt-8 rounded-2xl bg-[#1c1c1c] h-40 flex items-center justify-center text-[#999999]">
                                    Builder Preview
                                </div>
                            </div>

                            {/* Gradient Card */}
                            <div
                                className="md:col-span-2 rounded-[30px] p-8 min-h-[320px] text-white flex flex-col justify-between"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#6a4cf5 0%,#d44df0 100%)",
                                }}
                            >
                                <div>
                                    <span className="text-white/70 text-sm">
                                        Themes
                                    </span>

                                    <h3
                                        className={`${plusJakarta.className} text-3xl mt-3 tracking-[-0.03em]`}
                                    >
                                        Beautiful themes that feel premium
                                    </h3>
                                </div>

                                <p className="text-white/80">
                                    Customize colors, fonts and layouts instantly.
                                </p>
                            </div>

                            {/* Analytics */}
                            <div className="md:col-span-2 bg-[#141414] rounded-[30px] p-8 min-h-[260px]">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[#999999] text-sm">
                                        Analytics
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-[#1c1c1c] text-xs">
                                        Pro
                                    </span>
                                </div>

                                <h3
                                    className={`${plusJakarta.className} text-2xl tracking-[-0.03em]`}
                                >
                                    Track every click
                                </h3>

                                <p className="text-[#999999] mt-4">
                                    See traffic, CTR and top-performing links.
                                </p>
                            </div>

                            {/* Custom Domains */}
                            <div className="md:col-span-2 bg-[#141414] rounded-[30px] p-8 min-h-[260px]">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[#999999] text-sm">
                                        Branding
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-[#1c1c1c] text-xs">
                                        Upcoming
                                    </span>
                                </div>

                                <h3
                                    className={`${plusJakarta.className} text-2xl tracking-[-0.03em]`}
                                >
                                    Custom domains
                                </h3>

                                <p className="text-[#999999] mt-4">
                                    Connect your own domain in seconds.
                                </p>
                            </div>

                            {/* Gradient Spotlight */}
                            <div
                                className="md:col-span-2 rounded-[30px] p-8 min-h-[260px] text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#ff7a3d 0%,#ff5577 100%)",
                                }}
                            >
                                <span className="text-white/70 text-sm">
                                    Creator Mode
                                </span>

                                <h3
                                    className={`${plusJakarta.className} text-2xl mt-4 tracking-[-0.03em]`}
                                >
                                    Sell products and collect leads
                                </h3>
                            </div>

                            {/* AI Card */}
                            <div className="md:col-span-3 bg-[#141414] rounded-[30px] p-8 min-h-[280px]">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[#999999] text-sm">
                                        AI
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-[#1c1c1c] text-xs">
                                        Pro
                                    </span>
                                </div>

                                <h3
                                    className={`${plusJakarta.className} text-3xl tracking-[-0.03em]`}
                                >
                                    Generate your bio page instantly
                                </h3>

                                <p className="text-[#999999] mt-4 max-w-sm">
                                    Describe yourself and Snapbio creates a profile,
                                    links and theme automatically.
                                </p>
                            </div>

                            {/* QR Card */}
                            <div className="md:col-span-3 bg-[#141414] rounded-[30px] p-8 min-h-[280px]">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[#999999] text-sm">
                                        Growth
                                    </span>
                                </div>

                                <h3
                                    className={`${plusJakarta.className} text-3xl tracking-[-0.03em]`}
                                >
                                    Dynamic QR codes
                                </h3>

                                <p className="text-[#999999] mt-4 max-w-sm">
                                    Share your profile offline and update links
                                    anytime.
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
                                    name: "20+ More",
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
                                        className={`${plusJakarta.className} text-2xl font-bold mb-2 text-zinc-100`}
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
                                        Limited themes
                                    </li>
                                    <li className="flex items-center gap-3 text-[#94A3B8]">
                                        <div className="w-5 h-5 rounded-full border border-[#2A2A35] shrink-0" />
                                        Basic customization
                                    </li>
                                    <li className="flex items-center gap-3 text-[#94A3B8]">
                                        <div className="w-5 h-5 rounded-full border border-[#2A2A35] shrink-0" />
                                        No analytics
                                    </li>
                                </ul>
                                <Link
                                    href="/auth/signin"
                                    className="w-full py-3 px-4 rounded-full bg-[#0A0A0F] border border-[#2A2A35] text-center font-semibold hover:bg-[#1A1A22] transition-colors"
                                >
                                    Start Free
                                </Link>
                            </div>

                            {/* Pro Plan */}
                            <PricingCard />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            {/* <footer className="bg-[#0A0A0F] border-t border-[#2A2A35] py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/favicon-32x32.png"
                            alt="Snapbio"
                            className="w-6 h-6"
                        />
                        <span
                            className={`${plusJakarta.className} text-xl font-bold tracking-tight`}
                        >
                            Snapbio
                        </span>
                    </Link>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link
                            href="https://github.com/user-synax/snapbio"
                            className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                        >
                            GitHub
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                        >
                            Privacy
                        </Link>v
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
            </footer> */}

            <Footer />
        </body>
    );
}
