import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "Privacy Policy | Snapbio",
    description: "Snapbio privacy policy for user data, cookies, and account information.",
    keywords: ["Snapbio privacy", "data protection", "privacy policy", "user data policy"],
    openGraph: {
        title: "Privacy Policy | Snapbio",
        description: "Snapbio privacy policy for user data, cookies, and account information.",
        url: "/privacy",
        type: "website",
        images: [
            {
                url: "/link-icon-hig-res.png",
                alt: "Snapbio Privacy Policy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Snapbio",
        description: "Snapbio privacy policy for user data, cookies, and account information.",
        images: ["/link-icon-hig-res.png"],
    },
    alternates: {
        canonical: "/privacy",
    },
};

const sections = [
    {
        id: "introduction",
        title: "Introduction",
        content: [
            "Snapbio is committed to protecting your privacy and keeping your personal information secure. This policy explains what data we collect, how we use it, and the choices you have when using the service.",
        ],
    },
    {
        id: "information-we-collect",
        title: "Information We Collect",
        content: [
            "When you create an account, we collect information such as your name, email address, username, profile details, and any links you add to your profile.",
            "We also store authentication credentials securely and may keep metadata related to your account activity, such as link clicks and theme selections.",
        ],
    },
    {
        id: "how-we-use-information",
        title: "How We Use Information",
        content: [
            "We use the information you provide to deliver the Snapbio service, manage your account, and personalize your public bio page.",
            "We may also use data to improve product performance, troubleshoot issues, and communicate important updates about the service.",
        ],
    },
    {
        id: "cookies-and-tracking",
        title: "Cookies and Tracking",
        content: [
            "Snapbio uses cookies and similar technologies to maintain your session, remember preferences, and support analytics.",
            "We may use non-personal analytics data to understand how people engage with the site and to make improvements over time.",
        ],
    },
    {
        id: "third-party-services",
        title: "Third-Party Services",
        content: [
            "We may share information with service providers who help operate the site, such as hosting, database, and authentication providers.",
            "We do not sell your personal data to advertisers or third parties for marketing purposes.",
        ],
    },
    {
        id: "data-security",
        title: "Data Security",
        content: [
            "We apply industry-standard security practices to protect your information and prevent unauthorized access.",
            "While no system is completely secure, we continuously monitor and improve our controls to safeguard your data.",
        ],
    },
    {
        id: "your-rights",
        title: "Your Rights",
        content: [
            "You can manage your account information, update your profile, and request deletion of your data by using the tools within the service.",
            "If you have questions about your privacy or need assistance, contact us using the information below.",
        ],
    },
    {
        id: "changes",
        title: "Changes to This Policy",
        content: [
            "We may update this privacy policy from time to time. If we make material changes, we will post the revised policy on this page.",
            "Your continued use of Snapbio after changes are posted constitutes acceptance of the updated policy.",
        ],
    },
    {
        id: "contact",
        title: "Contact",
        content: [
            "If you have questions about this privacy policy, please reach out through the contact options available in the application.",
        ],
    },
];

export default function PrivacyPage() {
    return (
        <main className={`${inter.className} min-h-screen bg-[#090909] text-white`}>
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="relative overflow-hidden rounded-[30px] border border-[#262626] bg-[#0A0A0F] p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-40"
                        style={{
                            background:
                                "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.20), transparent 24%), radial-gradient(circle at 80% 10%, rgba(0,153,255,0.14), transparent 18%)",
                        }}
                    />

                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-full bg-[#13131A] px-4 py-2 text-sm uppercase tracking-[0.32em] text-[#94A3B8]">
                            <ShieldCheck className="h-4 w-4 text-[#7C3AED]" />
                            Privacy Policy
                        </div>

                        <div className="space-y-4">
                            <h1 className={`${plusJakarta.className} text-4xl sm:text-5xl font-bold tracking-tight`}>Privacy Policy</h1>
                            <p className="max-w-3xl text-slate-400 text-base sm:text-lg leading-8">
                                This privacy policy explains how Snapbio collects, uses, and protects your information when you create an account, build your bio page, and use the service.
                            </p>
                            <p className="text-sm uppercase tracking-[0.24em] text-[#94A3B8]">Last updated June 4, 2026</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/terms"
                                    className="inline-flex items-center justify-center rounded-full border border-[#2A2A35] bg-[#13131A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C1C22]"
                                >
                                    View Terms
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                                >
                                    Back to Home
                                </Link>
                            </div>
                            <div className="rounded-[20px] border border-[#262626] bg-[#0F0F15] px-4 py-3 text-sm text-slate-400">
                                Your use of Snapbio means you agree to this policy.
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
                            <p className="text-sm font-semibold text-white">Key notes</p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                <li>We keep your account and profile data for as long as the service is active.</li>
                                <li>Analytics are used to improve the product, not to sell your data.</li>
                                <li>If privacy terms change, we will update this page and notify users.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
