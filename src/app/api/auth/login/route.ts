import { NextResponse } from "next/server";
import { pool } from "../../../../../db/config/config";
import bcrypt from "bcrypt";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { validateLoginSchema } from "./validators";
import dotenv from "dotenv";
import { REDIRECT_ERROR_CODE } from "next/dist/client/components/redirect-error";

dotenv.config();

export async function POST(req: Request) {
  const ERROR_CODE = "AUTH-02";
  try {
    const body = await req.json();

    const { results, error } = await validateLoginSchema(body);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Validation Error" },
        { status: 400 }
      );
    }

    const { email, password } = results;

    const result = await pool.query(
      `SELECT * FROM core.users WHERE email = $1 AND is_deleted = false`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
    const jwtExpiresIn: SignOptions["expiresIn"] =
      (process.env.JWT_EXPIRES_IN as unknown as SignOptions["expiresIn"]) ??
      "1d";

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    return NextResponse.json({ token });
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
}
