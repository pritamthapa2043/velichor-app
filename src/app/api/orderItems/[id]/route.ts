import { NextResponse, NextRequest } from "next/server";
import { pool } from "../../../../../db/config/config";
import { validateUpdateOrderItem } from "./validators";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const result = await pool.query(
    `SELECT id, order_id, product_id, product_name, quantity, unit_price, discount, total, created_at
       FROM "order".order_items
       WHERE id = $1 AND is_deleted = false`,
      [id]
    );
    if (result.rows.length === 0)
      return NextResponse.json(
        { message: "Order item does not exists" },
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

  try {
    const body = await req.json();

    // Validate request body
    const { results, error } = await validateUpdateOrderItem(body);
    if (error) {
      return NextResponse.json({ errors: error }, { status: 400 });
    }

    // Check if the order item exists
    const existingItem = await pool.query(
      `SELECT * FROM "order".order_items WHERE id = $1 AND is_deleted = false`,
      [id]
    );

    if (existingItem.rows.length === 0) {
      return NextResponse.json({ error: "Order item not found" }, { status: 404 });
    }

    // Include updated_by and updated_at if not present
    const updated_by = req.headers.get("x-order-items-id") || results.updated_by || "system";
    const updated_at = new Date().toISOString();

    const allFields = {
      ...results,
      updated_by,
      updated_at,
    };

    // Build dynamic query
    const fieldEntries = Object.entries(allFields);
    if (fieldEntries.length === 0) {
      return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
    }

    const setString = fieldEntries
      .map(([key], index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(allFields);

    // Execute update
    const updatedItem = await pool.query(
      `UPDATE "order".order_items SET ${setString} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    );

    return NextResponse.json({ message: "Order item updated", item: updatedItem.rows[0] });
  } catch (err: any) {
    console.error("Error updating order item:", err);
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
      `UPDATE "order".order_items
         SET is_deleted = true,
             deleted_by = $2,
             deleted_at = $3
         WHERE id = $1`,
      [id, deleted_by, deleted_at]
    );
    return NextResponse.json({ message: "Order Item Deleted" });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
