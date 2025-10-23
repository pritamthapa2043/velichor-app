import { NextResponse, NextRequest } from "next/server";
import { validateAddCategorySchema } from "./[id]/validators";
import { pool } from "../../../../db/config/config";

export async function POST(req: NextRequest) {
  const ERROR_CODE = "CAT-01";
  const body = await req.json();
  const { results, error } = await validateAddCategorySchema(body);

  if (error) {
    console.error(error);
    return NextResponse.json({ errors: error });
  }

  const { name, description } = results;
  const created_at = new Date().toISOString();

  if (!name || !description) {
    return NextResponse.json({ message: "Missing fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO core.categories(name, description, created_at)
        VALUES($1, $2, $3) RETURNING id`,
      [name, description, created_at]
    );

    return NextResponse.json(
      { categoryId: result.rows[0].id },
      { status: 201 }
    );
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
  const ERROR_CODE = "CAT-05";
  try {
    const result = await pool.query(`
      SELECT id, name, description, created_at, updated_at, updated_by
      FROM core.categories WHERE is_deleted = false`);

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
