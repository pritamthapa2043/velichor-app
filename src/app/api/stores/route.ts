import { NextResponse, NextRequest } from "next/server";
import { pool } from "../../../../db/config/config";
import { validateAddStoreSchema } from "./[id]/validators";

export async function POST(req: NextRequest) {
  const ERROR_CODE = "STRE-01";
  const body = await req.json();
  const { results, error } = await validateAddStoreSchema(body);

  if (error) {
    console.error(error);
    return NextResponse.json({ errors: error });
  }

  const { address, city, state, zipcode, manager_name } = results;
  const created_at = new Date().toISOString();

  if (!address || !city || !state || !zipcode || !manager_name) {
    return NextResponse.json({ message: "Missing fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO core.stores(address, city, state, zipcode, manager_name, created_at)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
      [address, city, state, zipcode, manager_name, created_at]
    );

    return NextResponse.json({ storeId: result.rows[0].id }, { status: 201 });
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
  const ERROR_CODE = "STRE-05";
  try {
    const result = await pool.query(`
            SELECT id, address, city, state, zipcode, manager_name, created_at, updated_at, updated_by
            FROM core.stores WHERE is_deleted = false
        `);

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
