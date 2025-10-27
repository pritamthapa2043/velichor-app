import { NextResponse, NextRequest } from "next/server";
import { pool } from "../../../../../db/config/config";
import { validateUpdateOrder } from "./validators";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const result = await pool.query(
      `SELECT id, user_id, store_id, delivery_address_id, status, total_amount,created_at FROM "order".orders WHERE id = $1 AND is_deleted = false`,
      [id]
    );
    if (result.rows.length === 0)
      return NextResponse.json(
        { message: "Order does not exists" },
        { status: 404 }
      );

    return NextResponse.json(result.rows[0]);
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  const { results, error } = await validateUpdateOrder(body);

  if (error) {
    return NextResponse.json({ errors: error }, { status: 400 });
  }

  const updated_by = req.headers.get("x-order-id") || body.updated_by;
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

  if (Object.keys(results).length === 0) {
    return NextResponse.json(
      { message: "No valid fields to update" },
      { status: 400 }
    );
  }

  try {
    await pool.query(
      `UPDATE "order".orders SET ${fields} WHERE id = $${values.length + 1}`,
      [...values, id]
    );
    return NextResponse.json({ message: "Order updated" });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// SOFT DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Extract deleted_by from headers or body
  const deleted_by = "SYSTEM";
  const deleted_at = new Date().toISOString();

  try {
    await pool.query(
      `UPDATE "order".orders
         SET is_deleted = true,
             deleted_by = $2,
             deleted_at = $3
         WHERE id = $1`,
      [id, deleted_by, deleted_at]
    );
    return NextResponse.json({ message: "Order Deleted" });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
