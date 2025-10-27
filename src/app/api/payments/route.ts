import {NextResponse} from 'next/server';
import {pool} from '../../../../db/config/config';
import Razorpay from 'razorpay';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id,order_id, type, amount, status, transaction_id, paid_at, updated_by, created_at FROM "order".payments WHERE is_deleted = false`
    );
    console.log(result.rows);
    return NextResponse.json(result.rows);
  } catch (err: any) {
    let message = 'Something went wrong';   
    if (err instanceof Error) message = err.message;
    return NextResponse.json({error: message}, {status: 500});
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let {
      order_id,
      type,
      amount,
      status = "pending",
      transaction_id = null,
      paid_at = null,
      updated_by = "SYSTEM",
      note = null,
    } = body;

    // Validate required fields
    if (!order_id || !type || !amount) {
      return NextResponse.json(
        { error: "order_id, type, and amount are required" },
        { status: 400 }
      );
    }

    // Normalize status to match check constraint
    status = (status || "pending").toLowerCase();
    if (!["pending", "success", "failed", "refunded", "canceled", "authorized"].includes(status)) {
      status = "pending"; // fallback to safe default
    }

    // Check if order exists
    const orderCheck = await pool.query(
      `SELECT id, status FROM "order".orders WHERE id=$1 AND is_deleted=false`,
      [order_id]
    );

    if (orderCheck.rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderCheck.rows[0];
    const created_at = new Date().toISOString();

    // Insert payment
    const result = await pool.query(
      `INSERT INTO "order".payments
        (order_id, type, amount, status, transaction_id, paid_at, updated_by, created_at, is_deleted)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,false)
       RETURNING *`,
      [order_id, type, amount, status, transaction_id, paid_at, updated_by, created_at]
    );

    // If payment is successful, update order status and history
    if (status === "success") {
      const previousStatus = order.status;

      await pool.query(
        `UPDATE "order".orders 
         SET status='success', updated_at=NOW(), updated_by=$1 
         WHERE id=$2`,
        [updated_by, order_id]
      );

      // Insert into order_status_history
      await pool.query(
        `INSERT INTO "order".order_status_history
          (order_id, status, note, changed_at, changed_by)
         VALUES ($1,$2,$3,NOW(),$4)`,
        [order_id, "success", note || "Payment successful", updated_by]
      );
    }

    return NextResponse.json({ payment: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment" },
      { status: 500 }
    );
  }
}

// Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { order_id, amount, type } = body;

//     // Validate required fields
//     if (!order_id || !amount || !type) {
//       return NextResponse.json(
//         { error: "order_id, amount, and type are required" },
//         { status: 400 }
//       );
//     }

//     // Check if order exists
//     const orderCheck = await pool.query(
//       `SELECT id FROM "order".orders WHERE id = $1`,
//       [order_id]
//     );
//     if (orderCheck.rows.length === 0) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 });
//     }

//     const created_at = new Date().toISOString();

//     // Insert payment record (pending)
//     const paymentResult = await pool.query(
//       `INSERT INTO "order".payments
//         (order_id, type, amount, status, created_at, is_deleted, updated_by, updated_at)
//        VALUES ($1, $2, $3, 'pending', $4, false, NULL, NULL)
//        RETURNING *`,
//       [order_id, type, amount, created_at]
//     );

//     const payment = paymentResult.rows[0];

//     // Create Razorpay order
//     const options = {
//       amount: amount * 100, // convert to paise
//       currency: "INR",
//       receipt: payment.id, // use DB payment id as receipt
//       payment_capture: 1,
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     // Return DB payment + Razorpay order info
//     return NextResponse.json({
//       message: "Payment initiated",
//       payment,
//       razorpayOrder,
//     });
//   } catch (err: any) {
//     console.error("Error creating payment:", err);
//     return NextResponse.json(
//       { error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }