import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/onboarding", "/library", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // Session cookie is httpOnly and proxied — check for its presence
  const hasSession =
    request.cookies.has("connect.sid") ||
    request.cookies.has("barcode.sid");

  if (!hasSession) {
    const signIn = new URL("/auth/sign-in", request.url);
    signIn.searchParams.set("next", pathname);
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/library/:path*", "/admin/:path*"]
};
