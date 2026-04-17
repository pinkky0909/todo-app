import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config(); // 👈 this loads .env manually

console.log("DB URL:", process.env.DATABASE_URL); // 👈 debug

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});