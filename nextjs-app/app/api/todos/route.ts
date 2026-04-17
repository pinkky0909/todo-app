import { db } from "@/db";
import { todos } from "@/db/schema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const JWT_SECRET = "my_super_secret_key";

// helper to extract user from token
function getUserId(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.userId;
  } catch (err) {
    return null;
  }
}
function getUserId(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.userId;
  } catch {
    return null;
  }
}
// GET → fetch user todos only
export async function GET(req: Request) {
  const userId = getUserId(req);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId));

  return Response.json(data);
}

// POST → create todo for logged-in user
export async function POST(req: Request) {
  const userId = getUserId(req);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const newTodo = await db
    .insert(todos)
    .values({
      text: body.text,
      done: false,
      userId,
    })
    .returning();

  return Response.json(newTodo[0]);
}