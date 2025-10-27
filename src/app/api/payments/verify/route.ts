import { NextResponse, NextRequest } from "next/server";

import crypto from "crypto";
import { pool } from "../../../../../db/config/config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "razorpay_order_id, razorpay_payment_id, and razorpay_signature are required" },
        { status: 400 }
      );
    }

    // Fetch payment record from DB
    const paymentResult = await pool.query(
      `SELECT * FROM "order".payments WHERE id = $1 AND is_deleted = false`,
      [razorpay_order_id]
    );

    if (paymentResult.rows.length === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const payment = paymentResult.rows[0];

    // Verify Razorpay signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(payment.id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const paid_at = new Date().toISOString();

    // Update payments table
    await pool.query(
      `UPDATE "order".payments
       SET status = 'success',
           transaction_id = $1,
           paid_at = $2,
           updated_by = 'system',
           updated_at = $3
       WHERE id = $4`,
      [razorpay_payment_id, paid_at, paid_at, payment.id]
    );

    // Update orders table
    await pool.query(
      `UPDATE "order".orders
       SET status = 'paid',
           updated_by = 'system',
           updated_at = $1
       WHERE id = $2`,
      [paid_at, payment.order_id]
    );

    // Insert order status history
    await pool.query(
      `INSERT INTO "order".order_status_history
       (order_id, status, note, changed_at, changed_by)
       VALUES ($1, 'paid', 'Payment successful', $2, 'system')`,
      [payment.order_id, paid_at]
    );

    return NextResponse.json({ message: "Payment verified and order updated successfully" });

  } catch (err: any) {
    console.error("Error verifying payment:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
