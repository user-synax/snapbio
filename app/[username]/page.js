import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";
import LinkModel from "../../models/Link";
import { getTheme } from "../../lib/themes";
import BioLinks from "../../components/BioLinks";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }) {
    await connectToDatabase();
    const user = await User.findOne({ username: params.username });

    if (!user) {
        return {
            title: "404 Not Found | Snapbio",
        };
    }

    return {
        title: `@${user.username} | Snapbio`,
        description: user.bio || "",
        openGraph: {
            title: `@${user.username} | Snapbio`,
            description: user.bio || "",
        },
    };
}

export default async function BioPage({ params }) {
    await connectToDatabase();
    const user = await User.findOne({ username: params.username });

    if (!user) {
        notFound();
    }

    const links = await LinkModel.find({
        userId: user._id,
        isActive: true,
    }).sort({ order: 1 });

    const theme = getTheme(user.theme);

    // Convert MongoDB document to plain object
    const serializedLinks = links.map(link => ({
        _id: link._id.toString(),
        title: link.title,
        url: link.url
    }));

    return (
        <html lang="en">
            <body
                className={`${inter.className} min-h-screen`}
                style={{
                    backgroundColor: theme.bgColor,
                    color: theme.textColor,
                }}
            >
                <main className="max-w-md mx-auto py-16 sm:py-20 px-4 sm:px-6">
                    <div className="text-center space-y-4">
                        <div className="relative inline-block">
                            <div
                                className="absolute -inset-1 rounded-full blur-md opacity-50"
                                style={{ background: theme.accentGradient }}
                            />
                            <img
                                src={user.avatarUrl || user.image}
                                alt={user.name}
                                className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full object-cover border-2"
                                style={{ borderColor: theme.borderColor }}
                            />
                        </div>

                        <div className="space-y-1">
                            <h1
                                className={`${plusJakarta.className} text-xl sm:text-2xl font-bold tracking-tight`}
                                style={{ color: theme.textColor }}
                            >
                                {user.name}
                            </h1>
                            <p
                                className="text-sm"
                                style={{ color: theme.mutedColor }}
                            >
                                @{user.username}
                            </p>
                        </div>

                        {user.bio && (
                            <p
                                className="text-sm sm:text-base leading-relaxed max-w-sm mx-auto"
                                style={{ color: theme.mutedColor }}
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
                                style={{ color: theme.mutedColor }}
                            >
                                Made with Snapbio
                            </p>
                        )}
                    </div>
                </main>
            </body>
        </html>
    );
}
