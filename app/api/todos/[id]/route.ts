import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const existing = await db.collection("todos").findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await db.collection("todos").updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: !existing.completed } }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[PATCH /api/todos/:id] error", error);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection("todos").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[DELETE /api/todos/:id] error", error);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}

