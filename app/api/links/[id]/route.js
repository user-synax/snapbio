import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectToDatabase } from "../../../../lib/db";
import Link from "../../../../models/Link";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
    const { id } = await params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    await connectToDatabase();
    const link = await Link.findById(id);

    if (!link) {
        return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Check that the link belongs to the current user
    if (link.userId.toString() !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedLink = await Link.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true },
    );

    return NextResponse.json(updatedLink);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const link = await Link.findById(id);

    if (!link) {
        return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    if (link.userId.toString() !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Link.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
