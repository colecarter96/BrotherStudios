import { NextRequest, NextResponse } from "next/server";
import {
  MEDIAKIT_AUTH_COOKIE,
  isMediakitPasswordConfigured,
  isValidMediakitSession,
} from "@/lib/mediakit-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/mediakit") || pathname.startsWith("/mediakit/login")) {
    return NextResponse.next();
  }

  if (!isMediakitPasswordConfigured()) {
    return NextResponse.next();
  }

  const token = request.cookies.get(MEDIAKIT_AUTH_COOKIE)?.value;
  if (await isValidMediakitSession(token)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/mediakit/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/mediakit/:path*"],
};
