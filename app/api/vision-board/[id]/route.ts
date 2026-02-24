import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { caption } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("vision_items").updateOne(
      { _id: new ObjectId(id) },
      { $set: { caption: caption.trim() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PATCH /api/vision-board/[id]] error", error);
    return NextResponse.json({ error: "Failed to update vision item" }, { status: 500 });
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

    const result = await db.collection("vision_items").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
       return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/vision-board/[id]] error", error);
    return NextResponse.json({ error: "Failed to delete vision item" }, { status: 500 });
  }
}
