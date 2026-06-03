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

    return (
        <BuilderClient
            initialLinks={links}
            isPro={user.isPro}
            currentTheme={user.theme || "default"}
        />
    );
}
