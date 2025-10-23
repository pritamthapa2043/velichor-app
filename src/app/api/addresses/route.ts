import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../db/config/config";
import { validateAddAddressSchema } from "./[id]/validators";

export async function POST(req: NextRequest) {
  const ERROR_CODE = "ADDR-01";

  const body = await req.json();
  const { results, error } = await validateAddAddressSchema(body);

  if (error) {
    console.error(error);
    return NextResponse.json({ errors: error });
  }

  const { user_id, line1, line2, city, state, pincode } = results;
  const created_at = new Date().toISOString();
  const created_by = req.headers.get("x-user-id") || "SYSTEM";

  if (!user_id || !line1 || !city || !state || !pincode) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO core.addresses(user_id, line1, line2, city, state, pincode, created_at, created_by)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [user_id, line1, line2, city, state, pincode, created_at, created_by]
    );

    return NextResponse.json({ addressId: result.rows[0].id }, { status: 201 });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}

export async function GET() {
  const ERROR_CODE = "ADDR-05";
  try {
    const result = await pool.query(
      `SELECT id, user_id, line1, line2, city, state, pincode,
            created_at, created_by, updated_at, updated_by, deleted_by, deleted_at
            FROM core.addresses WHERE is_deleted = false`
    );
    return NextResponse.json(result.rows);
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
