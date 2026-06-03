import { getServerSession } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import AnalyticsDashboard from "./AnalyticsDashboard";
import UpgradePrompt from "../../../components/UpgradePrompt";

export default async function AnalyticsPage() {
    const session = await getServerSession();
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });

    if (!user.isPro) {
        return <UpgradePrompt />;
    }

    return <AnalyticsDashboard />;
}
