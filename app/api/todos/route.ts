import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const todos = await db
      .collection("todos")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const data: Todo[] = todos.map((todo: any) => ({
      id: todo._id.toString(),
      title: todo.title ?? "",
      completed: Boolean(todo.completed),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/todos] error", error);
    return NextResponse.json({ error: "Failed to load todos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = (body.title ?? "").toString().trim();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("todos").insertOne({
      title,
      completed: false,
      createdAt: new Date(),
    });

    const todo: Todo = {
      id: result.insertedId.toString(),
      title,
      completed: false,
    };

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("[POST /api/todos] error", error);
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}

