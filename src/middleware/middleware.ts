import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET! as string);
    return NextResponse.next();
  } catch (err) {
    // Token expired or invalid
    console.log("JWT Verification Failed: ", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/api/auth/:path*"],
};
