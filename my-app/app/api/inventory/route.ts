import { NextRequest, NextResponse } from "next/server";
import { getInventoryForSlug, getInventoryDisplayForSlug } from "@/lib/inventory";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") || "";
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const counts = await getInventoryForSlug(slug);
  const display = await getInventoryDisplayForSlug(slug);
  // counts reflect size-tracked inventory; display can still exist for edition-cap-only products
  if (!counts) {
    return NextResponse.json({ slug, tracked: false, counts: null, display }, { status: 200 });
  }
  return NextResponse.json({ slug, tracked: true, counts, display }, { status: 200 });
}
