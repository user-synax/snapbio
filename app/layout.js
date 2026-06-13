import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "../components/SessionProvider";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
    subsets: ["latin"],
});

export const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://snapbio.usersynax.dev",
);

export const metadata = {
    title: {
        default: "Snapbio",
        template: "%s | Snapbio",
    },
    description:
        "Create a beautifully branded Linktree-style bio page that consolidates your links, socials, and content into one shareable profile.",
    metadataBase,
    themeColor: "#0A0A0F",
    keywords: [
        "bio link page",
        "link in bio",
        "linktree alternative",
        "personal landing page",
        "social profile page",
        "creator landing page",
        "Snapbio",
    ],
    authors: [
        {
            name: "Ayush, India",
            url: "https://snapbio.usersynax.dev",
        },
    ],
    creator: "Ayush",
    verification: {
        google: "mtSQQTLUoP5DvYa7RCE6CnrEoUYfmWX0FdkkYzDO8Po",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "/",
        title: "Snapbio | Create a beautiful link-in-bio page",
        description:
            "Create a beautifully branded Linktree-style bio page that consolidates your links, socials, and content into one shareable profile.",
        siteName: "Snapbio",
        images: [
            {
                url: "/link-icon-hig-res.png",
                width: 1200,
                height: 630,
                alt: "Snapbio link page builder",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Snapbio | Create a beautiful link-in-bio page",
        description:
            "Create a beautifully branded Linktree-style bio page that consolidates your links, socials, and content into one shareable profile.",
        creator: "@Snapbio",
        images: ["/link-icon-hig-res.png"],
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
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
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }) {
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://snapbio.usersynax.dev";

    return (
        <html
            lang="en"
            className={`${inter.variable} ${plusJakartaSans.variable}`}
        >
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Snapbio",
                            description:
                                "Create a beautifully branded Linktree-style bio page that consolidates your links, socials, and content into one shareable profile.",
                            url: siteUrl,
                            logo: `${siteUrl}/link-icon-hig-res.png`,
                            sameAs: [siteUrl],
                        }),
                    }}
                />
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
