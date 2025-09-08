import { NextResponse } from "next/server";
import { pool } from "../../../../db/config/config"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { validateLoginSchema } from "./validators";
import dotenv from "dotenv"

dotenv.config();

export async function POST(req: Request){
    try{
        const body = await req.json();

        const { results, error } = await validateLoginSchema(body);

        if(error){
            console.error(error)
            return NextResponse.json({ message: "Validation Error"}, { status: 400})
        }

        const { email, password } = results;

        const result = await pool.query(
            `SELECT * FROM core.users WHERE email = $1 AND is_deleted = false`,
            [email]
        )

        if(result.rows.length === 0){
            return NextResponse.json({ message: 'Invalid Credentials'}, { status: 400})
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash)

        if(!match){
            return NextResponse.json({ message: 'Invalid Credentials'}, { status: 400})
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        )

        return NextResponse.json({ token })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ message: 'Server Error'}. { status: 500})
    }
}


