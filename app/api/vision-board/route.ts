import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type VisionItem = {
  id: string;
  caption: string;
  mimeType: string;
  imageBase64: string;
  createdAt: string | null;
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const items = await db
      .collection("vision_items")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const data: VisionItem[] = items.map((item: any) => ({
      id: item._id.toString(),
      caption: item.caption ?? "",
      mimeType: item.mimeType ?? "image/jpeg",
      imageBase64: item.imageBase64 ?? "",
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/vision-board] error", error);
    return NextResponse.json({ error: "Failed to load vision board" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const caption = (formData.get("caption") ?? "").toString().trim();

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const client = await clientPromise;
    const db = client.db();

    const now = new Date();
    const result = await db.collection("vision_items").insertOne({
      caption,
      mimeType: file.type || "image/jpeg",
      imageBase64: base64,
      createdAt: now,
    });

    const item: VisionItem = {
      id: result.insertedId.toString(),
      caption,
      mimeType: file.type || "image/jpeg",
      imageBase64: base64,
      createdAt: now.toISOString(),
    };

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[POST /api/vision-board] error", error);
    return NextResponse.json({ error: "Failed to save vision item" }, { status: 500 });
  }
}

