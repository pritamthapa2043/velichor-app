import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "../../../../../db/config/config";
import { validateRegisterSchema } from "./validators";

export async function POST(req: Request) {
  const body = await req.json();
  const { results, error } = await validateRegisterSchema(body);

  if (error) {
    console.error(error);
    return NextResponse.json(error);
  }
  const { name, email, password, phone } = body;

  if (!email || !password || !name || !phone) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const existing = await pool.query(
      `SELECT id FROM core.users WHERE email = $1`,
      [email]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: `Email already registered` },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO core.users(name, email, phone, password_hash)
      VALUES($1, $2, $3, $4) RETURNING id`,
      [name, email, phone, hash]
    );

    return NextResponse.json({ userId: result.rows[0].id }, { status: 201 });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
