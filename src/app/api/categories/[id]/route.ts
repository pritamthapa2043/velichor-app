import { NextResponse, NextRequest } from "next/server";
import { pool } from "../../../../../db/config/config";
import { validateUpdateCategory } from "./validators";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ERROR_CODE = "CAT-02";
  const { id } = await params;

  try {
    const result = await pool.query(
      `
            SELECT id, name, description, image, created_at, updated_by, updated_at\
            FROM core.categories WHERE id = $1 AND is_deleted = false`,
      [id]
    );

    if (result.rows.length === 0)
      return NextResponse.json(
        {
          message: "Category does not exist",
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
  const ERROR_CODE = "CAT-03";
  const { id } = await params;
  const body = await req.json();

  const { results, error } = await validateUpdateCategory(body);

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
      `UPDATE core.categories SET ${fields} WHERE id = $${
        values.length + 1
      } AND is_deleted = false`,
      [...values, id]
    );

    return NextResponse.json({ message: "Category Updated" });
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
  const ERROR_CODE = "CAT-04";
  const { id } = await params;
  const deleted_by = req.headers.get("x-user-id") || "system";
  const deleted_at = new Date().toISOString();

  try {
    await pool.query(
      `UPDATE core.categories SET is_deleted = true, deleted_by = $1, deleted_at = $2 WHERE id = $3 AND is_deleted = false`,
      [deleted_by, deleted_at, id]
    );

    return NextResponse.json({ message: "Category Deleted" });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
