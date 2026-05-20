import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../../db/config/config";
import { getCurrentUser } from "@/lib/auth";

// Remove product from wishlist
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ERROR_CODE = "WISHLIST-03";
  try {
    const { id } = await params;
    const productId = Number(id);
    const user = getCurrentUser(req);

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unable to fetch current user details" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `DELETE FROM core.wishlist WHERE product_id = $1 AND user_id = $2 RETURNING id`,
      [productId, user.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ id: result.rows[0].id });
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
