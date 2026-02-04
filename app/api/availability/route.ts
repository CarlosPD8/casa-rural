import { sql } from "@/lib/neon";

export async function GET() {
  const ranges = await sql`
    SELECT
      id,
      to_char(start_date, 'YYYY-MM-DD') as start_date,
      to_char(end_date, 'YYYY-MM-DD') as end_date,
      note
    FROM blocked_ranges
    ORDER BY start_date ASC
  `;

  return Response.json({ ranges });
}
