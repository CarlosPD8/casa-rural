import { sql } from "@/lib/neon";

type BodyCreate = {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  note?: string;
};

type InsertRow = { id: string };

export async function POST(req: Request) {
  const body = (await req.json()) as BodyCreate;

  if (!body?.startDate || !body?.endDate) {
    return Response.json({ error: "Missing startDate/endDate" }, { status: 400 });
  }

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(body.startDate) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(body.endDate)
  ) {
    return Response.json(
      { error: "Invalid date format. Use YYYY-MM-DD" },
      { status: 400 }
    );
  }

  const inserted = (await sql`
    INSERT INTO blocked_ranges (start_date, end_date, note)
    VALUES (${body.startDate}::date, ${body.endDate}::date, ${body.note ?? null})
    RETURNING id
  `) as InsertRow[];

  const id = inserted[0]?.id;

  return Response.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  await sql`DELETE FROM blocked_ranges WHERE id = ${id}`;

  return Response.json({ ok: true });
}
