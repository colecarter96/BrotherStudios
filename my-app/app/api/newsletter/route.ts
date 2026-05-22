import { NextRequest, NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/newsletter";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof (body as { email?: unknown })?.email === "string" ? (body as { email: string }).email : "";
  const honeypot =
    typeof (body as { website?: unknown })?.website === "string" ? (body as { website: string }).website : "";

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const result = await subscribeNewsletter(email);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
