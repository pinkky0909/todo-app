import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

// USERS table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

// TODOS table (now linked to user)
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false),

  userId: text("user_id").notNull(),
});