import { NextRequest, NextResponse } from "next/server";
import {
  MEDIAKIT_AUTH_COOKIE,
  getMediakitSessionToken,
  isMediakitPasswordConfigured,
  isValidMediakitPassword,
  mediakitAuthCookieOptions,
} from "@/lib/mediakit-auth";

export async function POST(req: NextRequest) {
  if (!isMediakitPasswordConfigured()) {
    return NextResponse.json({ error: "Media kit access is not configured." }, { status: 503 });
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isValidMediakitPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await getMediakitSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Media kit access is not configured." }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(MEDIAKIT_AUTH_COOKIE, token, mediakitAuthCookieOptions());
  return response;
}
