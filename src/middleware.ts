export { default } from "next-auth/middleware";

import dayjs from "dayjs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  const isexp = dayjs().isAfter(token?.duration as string)
  if(isexp){
    console.log("Token expired, redirecting to login")
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token || !token.role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.role;

  // Proteksi untuk masing-masing role
  if (url.pathname.startsWith("/user") && role !== "user") {
    // console.log("Middleware aktif untuk user!");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (url.pathname.startsWith("/operator") && role !== "operator") {
    // console.log("Middleware aktif untuk operator!");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (url.pathname.startsWith("/admin") && role !== "admin") {
    // console.log("Middleware aktif untuk admin!");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/operator/:path*", "/admin/:path*"],
};
