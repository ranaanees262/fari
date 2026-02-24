import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { content, mood } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const updateData: any = {};
    if (content !== undefined) updateData.content = content.trim();
    if (mood !== undefined) updateData.mood = mood;

    const result = await db.collection("diary_entries").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PATCH /api/diary/[id]] error", error);
    return NextResponse.json({ error: "Failed to update diary entry" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("diary_entries").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
       return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/diary/[id]] error", error);
    return NextResponse.json({ error: "Failed to delete diary entry" }, { status: 500 });
  }
}
