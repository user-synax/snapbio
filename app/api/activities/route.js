
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { connectToDatabase } from "../../../lib/db";
import Activity from "../../../models/Activity";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const type = searchParams.get("type") || "all";
    const skip = (page - 1) * limit;

    let filter = { userId: session.user.id };
    if (type !== "all") {
      filter.type = type;
    }

    const [activities, total] = await Promise.all([
      Activity.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Activity.countDocuments(filter),
    ]);

    return NextResponse.json({
      activities,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await connectToDatabase();

    const activity = await Activity.create({
      userId: session.user.id,
      type: body.type,
      metadata: body.metadata || {},
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
