export const MEDIAKIT_AUTH_COOKIE = "mediakit_auth";
const SESSION_SALT = "mediakit-session:v1";

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isMediakitPasswordConfigured(): boolean {
  return Boolean(process.env.MEDIAKIT_PASSWORD?.trim());
}

export async function getMediakitSessionToken(): Promise<string | null> {
  const password = process.env.MEDIAKIT_PASSWORD?.trim();
  if (!password) return null;
  return sha256Hex(`${SESSION_SALT}:${password}`);
}

export async function isValidMediakitSession(token: string | undefined | null): Promise<boolean> {
  const expected = await getMediakitSessionToken();
  if (!expected || !token) return false;
  return timingSafeEqual(token, expected);
}

export function isValidMediakitPassword(input: string): boolean {
  const password = process.env.MEDIAKIT_PASSWORD?.trim();
  if (!password) return false;
  return timingSafeEqual(input, password);
}

export function mediakitAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/mediakit",
    maxAge: 60 * 60 * 24 * 7,
  };
}
