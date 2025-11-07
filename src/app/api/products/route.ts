import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../db/config/config";
import { validateAddProductSchema } from "./[id]/validators";

export async function POST(req: NextRequest) {
  const ERROR_CODE = "PROD-01";

  const body = await req.json();
  const { results, error } = await validateAddProductSchema(body);

  if (error) {
    console.error(error);
    return NextResponse.json({ errors: error });
  }

  const { name, description, price, stock_level, category_id, image_url } =
    results;
  const created_at = new Date().toISOString();

  if (
    !name ||
    price === undefined ||
    stock_level === undefined ||
    !category_id ||
    !image_url
  ) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const result = await pool.query(
      `INSERT INTO core.products(name, description, price, stock_level, category_id, images, created_at)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        name,
        description,
        price,
        stock_level,
        category_id,
        image_url,
        created_at,
      ]
    );

    return NextResponse.json({ productId: result.rows[0].id }, { status: 201 });
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
  const ERROR_CODE = "PR0D-05";
  try {
    const result = await pool.query(
      `SELECT p.id, p.name, p.description, p.price, p.stock_level, c.name AS category, p.images, p.created_at, p.updated_by, p.updated_at, 
        p.deleted_by, p.deleted_at
      FROM core.products p 
      LEFT JOIN core.categories c ON c.id = p.category_id
      WHERE p.is_deleted = false AND c.is_deleted = false`
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
