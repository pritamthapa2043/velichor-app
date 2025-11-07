import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

interface DecodedUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export function getCurrentUser(req: NextRequest): DecodedUser | null {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;

    return decoded;
  } catch (err) {
    console.error("Invalid JWT: ", err);
    return null;
  }
}
