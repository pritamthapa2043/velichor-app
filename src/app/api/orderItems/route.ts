import {NextResponse} from 'next/server';
import {pool} from '../../../../db/config/config';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, order_id, product_id, product_name,quantity, unit_price,discount, total, created_at FROM "order".order_items WHERE is_deleted = false`
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

    const {
      order_id,
      product_id,
      quantity,
      unit_price,
      discount,
      total
    } = body;

    // Define required fields properly
    const requiredFields:any = {
      order_id,
      product_id,
      quantity,
      unit_price,
      total // discount and deleted fields might be optional in most schemas
    };

    // Find missing required fields (check for undefined or null)
    const missingFields = Object.keys(requiredFields).filter(
      (key) => requiredFields[key] === undefined || requiredFields[key] === null
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if order exists
    const orderCheck = await pool.query(
      `SELECT id FROM "order".orders WHERE id = $1`,
      [order_id]
    );
    if (orderCheck.rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if product exists
    const productCheck = await pool.query(
      `SELECT id,name FROM core.products WHERE id = $1`,
      [product_id]
    );
    if (productCheck.rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
const product_name = productCheck.rows[0].name;
    // Insert into order_items
    const created_at = new Date().toISOString();

    const result = await pool.query(
      `
      INSERT INTO "order".order_items 
      (order_id, product_id, product_name, quantity, unit_price, discount, total, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        order_id,
        product_id,
        product_name,
        quantity,
        unit_price,
        discount || 0, // default discount to 0 if not provided
        total,
        created_at
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err: any) {
    console.error("Error inserting order item:", err);

    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
