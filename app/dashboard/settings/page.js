import { getServerSession } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
    const session = await getServerSession();
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white">
                    Settings
                </h1>
                <p className="text-[#94A3B8] mt-1">
                    Manage your Snapbio profile
                </p>
            </div>

            <SettingsForm user={user} />
        </div>
    );
}
