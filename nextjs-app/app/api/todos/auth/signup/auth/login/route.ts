import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const JWT_SECRET = "my_super_secret_key";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user.length) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 400 }
    );
  }

  const validPassword = await bcrypt.compare(
    password,
    user[0].password
  );

  if (!validPassword) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 400 }
    );
  }

  const token = jwt.sign(
    { userId: user[0].id, email: user[0].email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    message: "Login successful",
    token,
  });
}