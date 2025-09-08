import { NextResponse } from "next/server";
import { pool } from "../../../../db/config/config";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, email, phone, role, is_active FROM core.users WHERE is_deleted = false`
    );
    return NextResponse.json(result.rows);
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
