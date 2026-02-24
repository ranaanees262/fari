import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const entries = await db
      .collection("diary_entries")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const data = entries.map((entry: any) => ({
      id: entry._id.toString(),
      content: entry.content ?? "",
      mood: entry.mood ?? "😊",
      createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : null,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/diary] error", error);
    return NextResponse.json({ error: "Failed to load diary entries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content, mood } = await request.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const now = new Date();
    const result = await db.collection("diary_entries").insertOne({
      content,
      mood: mood || "😊",
      createdAt: now,
    });

    const entry = {
      id: result.insertedId.toString(),
      content,
      mood: mood || "😊",
      createdAt: now.toISOString(),
    };

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("[POST /api/diary] error", error);
    return NextResponse.json({ error: "Failed to save diary entry" }, { status: 500 });
  }
}
