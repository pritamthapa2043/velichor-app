import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../../db/config/config";
import { validateUpdateCartItem } from "./validators";
import { getCurrentUser } from "@/lib/auth";

// Get a single cart item by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ERROR_CODE = "CART-03";
  const { id } = await params;
  const user = getCurrentUser(req);

  if (!user || !user.id) {
    return NextResponse.json(
      { message: "Unable to fetch current user details" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `SELECT id, user_id, product_id, quantity, size, color,
              created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
         FROM core.cart_items
        WHERE id = $1 AND is_deleted = false AND user_id = $2`,
      [id, user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

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

// Update a cart item
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ERROR_CODE = "CART-04";
  const { id } = await params;

  try {
    const body = await req.json();
    const { results, error } = await validateUpdateCartItem(body);
    const user = getCurrentUser(req);

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    if (error) {
      return NextResponse.json({ errors: error }, { status: 400 });
    }

    const checkUpdateItemExists = await pool.query(
      `
      SELECT 1 FROM core.cart_items where is_deleted = false AND id = $1`,
      [id]
    );

    if (checkUpdateItemExists.rowCount === 0) {
      console.error("Cart Item does not exist");
      return NextResponse.json(
        { message: "Cart Item does not exist " },
        { status: 404 }
      );
    }

    const updated_by = user.id;
    const updated_at = new Date().toISOString();

    if (Object.keys(results).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update" },
        { status: 400 }
      );
    }

    const allFields = { ...results, updated_by, updated_at } as Record<
      string,
      unknown
    >;

    const fields = Object.entries(allFields)
      .map(([key], i) => `${key} = $${i + 1}`)
      .join(", ");

    const values = Object.values(allFields);

    await pool.query(
      `UPDATE core.cart_items SET ${fields} WHERE id = $${
        values.length + 1
      } AND is_deleted = false`,
      [...values, id]
    );

    return NextResponse.json({ message: "Cart item updated" });
  } catch (err: any) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}

// Soft delete a cart item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ERROR_CODE = "CART-05";
  const { id } = await params;
  try {
    const user = getCurrentUser(req);

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    const deleted_by = user;
    const deleted_at = new Date().toISOString();

    await pool.query(
      `UPDATE core.cart_items
          SET is_deleted = true,
              deleted_by = $2,
              deleted_at = $3
        WHERE id = $1 AND user_id = $4`,
      [id, deleted_by, deleted_at, user.id]
    );

    return NextResponse.json({ message: "Cart item deleted" });
  } catch (err: any) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
