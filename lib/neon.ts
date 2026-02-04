import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL no está definida");
}

export const sql = neon(url);
