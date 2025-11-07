import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../db/config/config";
import { validateAddWishlistItem } from "./validators";
import { getCurrentUser } from "@/lib/auth";

// List wishlist items
export async function GET(req: NextRequest) {
  const ERROR_CODE = "WISHLIST-01";
  try {
    const user = getCurrentUser(req);

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT id, user_id, product_id, created_by, created_at
         FROM core.wishlist WHERE is_deleted = false AND user_id = $1
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

// Add product to wishlist
export async function POST(req: NextRequest) {
  const ERROR_CODE = "WISHLIST-02";
  try {
    const body = await req.json();
    const user = getCurrentUser(req);

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    const { results, error } = await validateAddWishlistItem(body);

    if (error) {
      return NextResponse.json({ errors: error }, { status: 400 });
    }

    const created_by = user.name;
    const created_at = new Date().toISOString();

    const { product_id } = results || {};

    const insertResult = await pool.query(
      `INSERT INTO core.wishlist (user_id, product_id, created_by, created_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [user.id, product_id, created_by, created_at]
    );

    // If already existed and no row returned, respond 200 OK id: null
    if (insertResult.rows.length === 0) {
      return NextResponse.json({ id: null }, { status: 200 });
    }

    return NextResponse.json({ id: insertResult.rows[0].id }, { status: 201 });
  } catch (err: any) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
