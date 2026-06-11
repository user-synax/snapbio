import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import LinkModel from "../../models/Link";
import { getTheme } from "../../lib/themes";
import { getRandomEmoji, getAvatarBgColor } from "../../lib/avatar";
import BioLinks from "../../components/BioLinks";
import ProfileViewTracker from "../../components/ProfileViewTracker";

export const runtime = "nodejs";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://snapbio.usersynax.dev";

export async function generateMetadata({ params }) {
    const { username } = await params;
    await connectToDatabase();
    const user = await User.findOne({ username });

    if (!user) {
        return {
            title: "404 Not Found | Snapbio",
            description: "The requested Snapbio profile could not be found.",
            keywords: ["Snapbio 404", "profile not found", "bio page missing"],
            icons: {
                icon: [
                    { url: "/favicon.ico" },
                    {
                        url: "/favicon-16x16.png",
                        sizes: "16x16",
                        type: "image/png",
                    },
                    {
                        url: "/favicon-32x32.png",
                        sizes: "32x32",
                        type: "image/png",
                    },
                ],
                apple: [
                    {
                        url: "/apple-touch-icon.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                ],
                other: [
                    {
                        rel: "android-chrome-192x192",
                        url: "/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        rel: "android-chrome-512x512",
                        url: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
            openGraph: {
                title: "404 Not Found | Snapbio",
                description:
                    "The requested Snapbio profile could not be found.",
                url: `${siteUrl}/${username}`,
                type: "website",
                images: [
                    {
                        url: "/link-icon-hig-res.png",
                        alt: "Snapbio profile not found",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: "404 Not Found | Snapbio",
                description:
                    "The requested Snapbio profile could not be found.",
                images: ["/link-icon-hig-res.png"],
            },
            alternates: {
                canonical: `/${username}`,
            },
        };
    }

    return {
        title: `@${user.username} | Snapbio`,
        description: user.bio || `Link page for @${user.username} on Snapbio.`,
        keywords: [
            `@${user.username}`,
            "bio link",
            "social landing page",
            "link in bio",
            "Snapbio",
        ],
        icons: {
            icon: [
                { url: "/favicon.ico" },
                {
                    url: "/favicon-16x16.png",
                    sizes: "16x16",
                    type: "image/png",
                },
                {
                    url: "/favicon-32x32.png",
                    sizes: "32x32",
                    type: "image/png",
                },
            ],
            apple: [
                {
                    url: "/apple-touch-icon.png",
                    sizes: "180x180",
                    type: "image/png",
                },
            ],
            other: [
                {
                    rel: "android-chrome-192x192",
                    url: "/android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    rel: "android-chrome-512x512",
                    url: "/android-chrome-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
        },
        openGraph: {
            title: `@${user.username} | Snapbio`,
            description:
                user.bio || `Link page for @${user.username} on Snapbio.`,
            url: `${siteUrl}/${user.username}`,
            type: "profile",
            siteName: "Snapbio",
            images: [
                {
                    url: "/link-icon-hig-res.png",
                    alt: `@${user.username} on Snapbio`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `@${user.username} | Snapbio`,
            description:
                user.bio || `Link page for @${user.username} on Snapbio.`,
            images: ["/link-icon-hig-res.png"],
        },
        alternates: {
            canonical: `/${user.username}`,
        },
    };
}

export default async function BioPage({ params }) {
    const { username } = await params;
    await connectToDatabase();
    const user = await User.findOne({ username });

    if (!user) {
        notFound();
    }

    const links = await LinkModel.find({
        userId: user._id,
        isActive: true,
    }).sort({ order: 1 });

    const theme = getTheme(user.theme);
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://snapbio.usersynax.dev";

    // Convert MongoDB document to plain object
    const serializedLinks = links.map((link) => ({
        _id: link._id.toString(),
        title: link.title,
        url: link.url,
        icon: link.icon,
    }));

    // Schema.org Person markup
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: user.name,
        description: user.bio || `Link page for @${user.username} on Snapbio`,
        url: `${siteUrl}/${user.username}`,
        image: user.avatarUrl || user.image || undefined,
        sameAs: links.map((link) => link.url).filter((url) => url),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personSchema),
                }}
            />
            <ProfileViewTracker userId={user._id.toString()} />
            <main
                className={`${inter.className} min-h-screen`}
                style={{
                    background: `${theme.bgPattern}, ${theme.bgGradient}`,
                    backgroundSize: `${theme.bgPatternSize}, cover`,
                }}
            >
                <div className="max-w-md mx-auto py-16 sm:py-20 px-4 sm:px-6">
                    <div
                        className="text-center space-y-4 rounded-[32px] border backdrop-blur-xl p-8"
                        style={{
                            background: theme.cardColor,
                            borderColor: theme.cardBorder || theme.borderColor,
                        }}
                    >
                        <div className="relative inline-block">
                            <div
                                className="absolute -inset-1 rounded-full blur-md opacity-50"
                                style={{ background: theme.accentGradient }}
                            />
                            {user.avatarUrl || user.image ? (
                                <img
                                    src={user.avatarUrl || user.image}
                                    alt={user.name}
                                    className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full object-cover border-2"
                                    style={{ borderColor: theme.borderColor }}
                                />
                            ) : (
                                <div
                                    className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl border-2"
                                    style={{
                                        backgroundColor: getAvatarBgColor(
                                            user._id.toString(),
                                        ),
                                        borderColor: theme.borderColor,
                                    }}
                                >
                                    {getRandomEmoji(user._id.toString())}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <h1
                                className={`${plusJakarta.className} text-xl sm:text-2xl font-bold`}
                                style={{
                                    color: theme.textColor,
                                    letterSpacing: "-1.0px",
                                }}
                            >
                                {user.name}
                            </h1>
                            <p
                                className="text-sm"
                                style={{
                                    color: theme.mutedColor,
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "15px",
                                    letterSpacing: "-0.15px",
                                    lineHeight: "1.30",
                                }}
                            >
                                @{user.username}
                            </p>
                        </div>

                        {user.bio && (
                            <p
                                className="text-sm sm:text-base leading-relaxed max-w-sm mx-auto"
                                style={{
                                    color: theme.mutedColor,
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "15px",
                                    letterSpacing: "-0.15px",
                                    lineHeight: "1.30",
                                }}
                            >
                                {user.bio}
                            </p>
                        )}

                        <BioLinks
                            links={serializedLinks}
                            theme={theme}
                            userId={user._id.toString()}
                        />

                        {!user.isPro && (
                            <p
                                className="text-xs mt-12"
                                style={{
                                    color: theme.mutedColor,
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "12px",
                                    letterSpacing: "-0.12px",
                                    lineHeight: "1.20",
                                }}
                            >
                                Made with{" "}
                                <a
                                    href="https://snapbio.usersynax.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: theme.accentGradient }}
                                    className="underline"
                                >
                                    Snapbio
                                </a>
                            </p>
                        )}
                    </div>
                </div>
                <Link
                    href={
                        process.env.NEXT_PUBLIC_SITE_URL ||
                        "https://snapbio.usersynax.dev"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`fixed bottom-6 right-6 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-lg flex items-center gap-2 ${inter.className}`}
                    style={{
                        background: theme.buttonBg,
                        color: theme.buttonText,
                        fontSize: "14px",
                        letterSpacing: "-0.14px",
                        lineHeight: "1.0",
                    }}
                >
                    <img
                        src="/favicon-32x32.png"
                        alt="Snapbio"
                        className="w-5 h-5"
                    />
                    Get your links page
                </Link>
            </main>
        </>
    );
}
