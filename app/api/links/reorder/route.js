import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import Link from "../../../../models/Link";

export const runtime = "nodejs";

export async function PATCH(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { order } = await request.json();

    await connectToDatabase();

    for (const item of order) {
        await Link.findByIdAndUpdate(item.id, { $set: { order: item.order } });
    }

    return NextResponse.json({ success: true });
}
