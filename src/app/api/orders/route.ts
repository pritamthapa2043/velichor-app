
import {NextResponse} from "next/server";
import {pool} from "../../../../db/config/config";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, user_id, store_id, delivery_address_id,status, total_amount, created_at FROM "order".orders WHERE is_deleted = false`
    );
    console.log(result.rows);
    return NextResponse.json(result.rows);
  } catch (err: any) {
    let message = "Something went wrong"; 

    if (err instanceof Error) message = err.message;
    return NextResponse.json({error: message}, {status: 500});
  } 
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, store_id, delivery_address_id, status, total_amount } = body;

    // Check for missing fields
    const requiredFields :any = { user_id, store_id, delivery_address_id, status, total_amount };
    const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if user exists
    const userCheck = await pool.query(
      `SELECT id FROM core.users WHERE id = $1`,
      [user_id]
    );
    if (userCheck.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if store exists
    const storeCheck = await pool.query(
      `SELECT id FROM core.stores WHERE id = $1`,
      [store_id]
    );
    if (storeCheck.rows.length === 0) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    // Check if delivery address exists
    const addressCheck = await pool.query(
      `SELECT id FROM core.addresses WHERE id = $1`,
      [delivery_address_id]
    );
    if (addressCheck.rows.length === 0) {
      return NextResponse.json({ error: "Delivery address not found" }, { status: 404 });
    }

    const created_at = new Date().toISOString();

    // Insert order
    const result = await pool.query(
      `INSERT INTO "order".orders 
      (user_id, store_id, delivery_address_id, status, total_amount, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, store_id, delivery_address_id, status, total_amount, created_at]
    );

    return NextResponse.json({ message: "Order Created", order: result.rows[0] }, { status: 201 });
  } catch (err: any) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
