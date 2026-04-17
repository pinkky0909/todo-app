import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user
  const newUser = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning();

  return NextResponse.json(newUser[0]);
}