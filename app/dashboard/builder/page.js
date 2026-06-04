import { getServerSession } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import Link from "../../../models/Link";
import BuilderClient from "./BuilderClient";

export default async function BuilderPage() {
    const session = await getServerSession();
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });
    const links = await Link.find({ userId: user._id }).sort({ order: 1 });

    // Convert to plain objects to pass to client component
    const serializedLinks = links.map(link => ({
        _id: link._id.toString(),
        title: link.title,
        url: link.url,
        icon: link.icon,
        isActive: link.isActive,
        order: link.order,
        userId: link.userId.toString(),
    }));

    return (
        <BuilderClient
            initialLinks={serializedLinks}
            isPro={user.isPro}
            currentTheme={user.theme || "default"}
            user={{
                _id: user._id.toString(),
                name: user.name,
                bio: user.bio,
                username: user.username,
                avatarUrl: user.avatarUrl,
                image: user.image
            }}
        />
    );
}
