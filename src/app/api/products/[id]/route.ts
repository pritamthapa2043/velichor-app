import { NextResponse, NextRequest } from "next/server";
import { pool } from "../../../../../db/config/config";
import { validateUpdateProduct } from "./validators";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ERROR_CODE = "PROD-02";
  const { id } = await params;

  try {
    const result = await pool.query(
      `SELECT p.id, p.name, p.description, p.price, p.stock_level, c.name AS category, p.images, p.created_at, p.updated_by, p.updated_at, 
        p.deleted_by, p.deleted_at
      FROM core.products p 
      LEFT JOIN core.categories c ON c.id = p.category_id
      WHERE p.is_deleted = false AND c.is_deleted = false AND p.id = $1`,
      [id]
    );

    if (result.rows.length === 0)
      return NextResponse.json(
        {
          message: "Product does not exist",
        },
        { status: 404 }
      );

    return NextResponse.json(result.rows[0]);
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ERROR_CODE = "PROD-03";
  const { id } = await params;
  const body = await req.json();

  const { results, error } = await validateUpdateProduct(body);

  if (error) {
    return NextResponse.json({ errors: error });
  }

  const updated_by = req.headers.get("x-user-id") || body.updated_by;
  const updated_at = new Date().toISOString();

  const allFields = {
    ...results,
    updated_by,
    updated_at,
  };

  const fields = Object.entries(allFields)
    .map(([key], i) => `${key} = $${i + 1}`)
    .join(", ");

  const values = Object.values(allFields);

  if (Object.keys(results).length === 0)
    return NextResponse.json(
      { message: "No valid fields to update" },
      { status: 400 }
    );

  try {
    await pool.query(
      `UPDATE core.products SET ${fields} WHERE id = $${
        values.length + 1
      } AND is_deleted = false`,
      [...values, id]
    );

    return NextResponse.json({ message: "Product Updated" });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}

// SOFT DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ERROR_CODE = "PROD-04";
  const { id } = await params;

  // Extract deleted_by from headers or body
  const deleted_by = "SYSTEM";
  const deleted_at = new Date().toISOString();

  try {
    await pool.query(
      `UPDATE core.products SET is_deleted = true, deleted_by = $2, deleted_at = $3
      WHERE id = $1 AND is_deleted = false`,
      [id, deleted_by, deleted_at]
    );

    return NextResponse.json({ message: "Product Deleted" });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
