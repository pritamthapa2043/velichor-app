import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../db/config/config";
import { validateAddCartItemSchema } from "./[id]/validators";
import { getCurrentUser } from "@/lib/auth";

// List cart items for a user
export async function GET(req: NextRequest) {
  const ERROR_CODE = "CART-01";
  try {
    const { searchParams } = new URL(req.url);
    const user = getCurrentUser(req);

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT id, user_id, product_id, quantity, size, color,
              created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
         FROM core.cart_items
        WHERE is_deleted = false AND user_id = $1
        ORDER BY created_at DESC`,
      [user.id]
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

// Add an item to cart
export async function POST(req: NextRequest) {
  const ERROR_CODE = "CART-02";
  try {
    const body = await req.json();
    const { results, error } = await validateAddCartItemSchema(body);

    if (error) {
      return NextResponse.json({ errors: error }, { status: 400 });
    }

    const user = getCurrentUser(req);

    if (!user || !user.id) {
      console.error("Unable to fetch current user details");
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    const { product_id, quantity, size, color } = results || {};

    const created_at = new Date().toISOString();
    const created_by = user?.name || null;

    const result = await pool.query(
      `INSERT INTO core.cart_items (user_id, product_id, quantity, size, color, created_by, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        user?.id,
        product_id,
        quantity,
        size || null,
        color || null,
        created_by,
        created_at,
      ]
    );

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 });
  } catch (err: any) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}

// Delete all items in cart
export async function DELETE(req: NextRequest) {
  const ERROR_CODE = "CART-06";
  try {
    const user = getCurrentUser(req);

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    const deleted_by = user.name;
    const deleted_at = new Date().toISOString();

    await pool.query(
      `UPDATE core.cart_items
          SET is_deleted = true,
              deleted_by = $2,
              deleted_at = $3
        WHERE user_id = $1`,
      [user.id, deleted_by, deleted_at]
    );

    return NextResponse.json({ message: "Cart has been cleared" });
  } catch (err: any) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
