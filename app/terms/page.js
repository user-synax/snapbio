import Link from "next/link";
import { FileText } from "lucide-react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "Terms of Service | Snapbio",
    description: "Snapbio terms of service for account use, content, and acceptable behavior.",
};

const sections = [
    {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: [
            "By using Snapbio, you agree to these Terms of Service and any updates posted on this page.",
            "If you do not agree with these terms, please do not use the service.",
        ],
    },
    {
        id: "account-registration",
        title: "Account Registration",
        content: [
            "You are responsible for providing accurate information when creating your Snapbio account.",
            "Keep your credentials secure and notify us immediately if you believe your account has been compromised.",
        ],
    },
    {
        id: "use-of-service",
        title: "Use of the Service",
        content: [
            "Snapbio is designed to help you create a single landing page for your profile and links.",
            "You agree not to use the service for unlawful purposes, to distribute harmful content, or to interfere with other users.",
        ],
    },
    {
        id: "user-content",
        title: "User Content",
        content: [
            "You are responsible for the content you publish through your profile and links.",
            "We reserve the right to remove or disable access to any content that violates these terms or applicable law.",
        ],
    },
    {
        id: "pro-features",
        title: "Pro Features and Billing",
        content: [
            "Some features may require a paid Pro account. All billing, upgrades, and subscriptions are subject to our separate billing terms.",
            "If you purchase Pro services, you agree to pay any applicable fees and to the payment terms displayed during checkout.",
        ],
    },
    {
        id: "analytics",
        title: "Analytics and Usage Data",
        content: [
            "We may collect analytics data to understand usage patterns, improve the service, and maintain security.",
            "Analytics information is used in accordance with the Snapbio Privacy Policy.",
        ],
    },
    {
        id: "termination",
        title: "Termination",
        content: [
            "We may suspend or terminate your account if you violate these terms or for any reason in our discretion.",
            "You may also close your account at any time through the application settings.",
        ],
    },
    {
        id: "changes",
        title: "Changes to These Terms",
        content: [
            "We may modify these terms at any time. When changes are posted, your continued use of Snapbio constitutes acceptance.",
        ],
    },
    {
        id: "contact",
        title: "Contact",
        content: [
            "If you have questions about these terms, please contact us through the support channels provided in the app.",
        ],
    },
];

export default function TermsPage() {
    return (
        <main className={`${inter.className} min-h-screen bg-[#090909] text-white`}>
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="relative overflow-hidden rounded-[30px] border border-[#262626] bg-[#0A0A0F] p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-40"
                        style={{
                            background:
                                "radial-gradient(circle at 15% 15%, rgba(0,153,255,0.16), transparent 24%), radial-gradient(circle at 75% 20%, rgba(124,58,237,0.18), transparent 22%)",
                        }}
                    />

                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-full bg-[#13131A] px-4 py-2 text-sm uppercase tracking-[0.32em] text-[#94A3B8]">
                            <FileText className="h-4 w-4 text-[#7C3AED]" />
                            Terms of Service
                        </div>

                        <div className="space-y-4">
                            <h1 className={`${plusJakarta.className} text-4xl sm:text-5xl font-bold tracking-tight`}>Terms of Service</h1>
                            <p className="max-w-3xl text-slate-400 text-base sm:text-lg leading-8">
                                These terms govern your access to and use of Snapbio. Please read them carefully before creating an account or publishing your profile page.
                            </p>
                            <p className="text-sm uppercase tracking-[0.24em] text-[#94A3B8]">Effective date June 4, 2026</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/privacy"
                                    className="inline-flex items-center justify-center rounded-full border border-[#2A2A35] bg-[#13131A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C1C22]"
                                >
                                    View Privacy Policy
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                                >
                                    Back to Home
                                </Link>
                            </div>
                            <div className="rounded-[20px] border border-[#262626] bg-[#0F0F15] px-4 py-3 text-sm text-slate-400">
                                Your use of the service is subject to these terms.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-10">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="space-y-4 rounded-[24px] border border-[#262626] bg-[#13131A] p-8">
                                <h2 className="text-2xl font-semibold tracking-tight text-white">{section.title}</h2>
                                <div className="space-y-4 text-slate-300 leading-7">
                                    {section.content.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    <aside className="space-y-6 rounded-[30px] border border-[#262626] bg-[#0D0D12] p-8">
                        <div className="space-y-3">
                            <p className="text-sm uppercase tracking-[0.24em] text-[#94A3B8]">Contents</p>
                            <ul className="space-y-2 text-slate-300">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <Link
                                            href={`#${section.id}`}
                                            className="text-base text-slate-300 transition hover:text-[#7C3AED]"
                                        >
                                            {section.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-[20px] border border-[#262626] bg-[#13131A] p-5 text-slate-300">
                            <p className="text-sm font-semibold text-white">Key points</p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                <li>You are responsible for the content you publish through your profile.</li>
                                <li>We may suspend accounts that violate these terms.</li>
                                <li>Pro feature access and billing are subject to separate payment terms.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
