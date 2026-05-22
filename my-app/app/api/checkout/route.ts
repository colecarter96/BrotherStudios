import { NextRequest, NextResponse } from "next/server";
import { assertEnoughStock } from "@/lib/inventory";

type CheckoutLineItem = {
  priceId: string;
  quantity?: number;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};

type CheckoutRequestBody =
  | {
      priceId: string;
      quantity?: number;
      metadata?: Record<string, string | number | boolean | null | undefined>;
    }
  | {
      items: CheckoutLineItem[];
      metadata?: Record<string, string | number | boolean | null | undefined>;
    };

/** Slugs that skip Stripe shipping rates (still collect address). */
const FREE_SHIPPING_SLUGS = new Set(["nepo-baby-tee"]);

function isFreeShippingSlug(slug: string) {
  return Boolean(slug && FREE_SHIPPING_SLUGS.has(slug));
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CheckoutRequestBody;
  const isBatch = "items" in body;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const slug = req.nextUrl.searchParams.get("slug") || "";
  const returnToRaw = req.nextUrl.searchParams.get("return_to");
  const safeReturnPath =
    returnToRaw &&
    returnToRaw.startsWith("/") &&
    !returnToRaw.startsWith("//") &&
    !returnToRaw.includes("://")
      ? returnToRaw
      : null;
  const successUrl =
    process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL ||
    `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl =
    process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL ||
    (safeReturnPath
      ? `${req.nextUrl.origin}${safeReturnPath}?canceled=1`
      : `${req.nextUrl.origin}/shop${slug ? `/${slug}` : ""}?canceled=1`);

  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

  try {
    const isSoldOut = async (slugToCheck: string) => {
      if (!slugToCheck) return false;
      // Only enforce for known one-of-one item(s)
      if (slugToCheck !== "dickies-pants") return false;
      try {
        const res = await stripe.paymentIntents.search({
          query: `status:'succeeded' AND metadata['slug']:'${slugToCheck}'`,
          limit: 1,
        });
        return (res?.data?.length || 0) > 0;
      } catch {
        return false;
      }
    };

    const resolvePriceId = async (maybeProductOrPriceId: string) => {
      if (maybeProductOrPriceId.startsWith("prod_")) {
        const product = await stripe.products.retrieve(maybeProductOrPriceId);
        const dp = product.default_price;
        if (typeof dp === "string" && dp.startsWith("price_")) {
          return dp;
        }
        const prices = await stripe.prices.list({ product: product.id, active: true, limit: 1 });
        if (prices.data[0]?.id) {
          return prices.data[0].id;
        }
        throw new Error("No active price found for product");
      }
      return maybeProductOrPriceId;
    };

    if (!isBatch) {
      const { priceId, quantity = 1, metadata } = body as Extract<CheckoutRequestBody, { priceId: string }>;
      if (!priceId) {
        return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
      }
      const resolvedPriceId = await resolvePriceId(priceId);
      const size = typeof metadata?.size === "string" && metadata.size ? String(metadata.size) : undefined;
      const color = typeof metadata?.color === "string" && metadata.color ? String(metadata.color) : undefined;
      const itemSlug = typeof metadata?.slug === "string" && metadata.slug ? String(metadata.slug) : slug;
      if (await isSoldOut(itemSlug)) {
        return NextResponse.json({ error: "This item is sold out." }, { status: 409 });
      }
      if (size) {
        const stock = await assertEnoughStock(itemSlug, size, quantity, color);
        if (!stock.ok) {
          return NextResponse.json({ error: stock.message }, { status: 409 });
        }
      }
      const shippingRateDefault = process.env.STRIPE_SHIPPING_RATE_ID; // optional
      const shippingRateSticker = process.env.STRIPE_SHIPPING_RATE_ID_STICKER; // optional
      let shippingRateId =
        itemSlug === "2-man-sticker" && shippingRateSticker ? shippingRateSticker : shippingRateDefault;
      if (isFreeShippingSlug(itemSlug)) {
        shippingRateId = undefined;
      }
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: resolvedPriceId,
            quantity,
          },
        ],
        allow_promotion_codes: true,
        shipping_address_collection: { allowed_countries: ["US"] },
        shipping_options: shippingRateId ? [{ shipping_rate: shippingRateId }] : undefined,
        metadata: {
          ...(itemSlug ? { slug: itemSlug } : {}),
          ...(size ? { size } : {}),
          ...(color ? { color } : {}),
          q: String(quantity),
          priceId: resolvedPriceId,
        },
        payment_intent_data: {
          metadata: {
            ...(itemSlug ? { slug: itemSlug } : {}),
            ...(size ? { size } : {}),
            ...(color ? { color } : {}),
            q: String(quantity),
            priceId: resolvedPriceId,
          },
        },
        ...(size
          ? {
              custom_text: {
                submit: { message: `Selected size: ${size}` },
              },
            }
          : {}),
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      return NextResponse.json({ url: session.url }, { status: 200 });
    }

    // Batch mode
    const { items } = body as Extract<CheckoutRequestBody, { items: CheckoutLineItem[] }>;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const lineItems: { price: string; quantity?: number }[] = [];
    // Minimal, compact cart metadata to avoid exceeding Stripe's per-value 500 char limit
    const cartMetaCompact: Array<{ p: string; s?: string; q: number; u?: string; c?: string }> = [];
    let allStickers = true;
    // Prevent checkout for any sold-out one-of-one item
    for (const item of items) {
      const itemSlug = typeof item.metadata?.slug === "string" ? item.metadata.slug : "";
      if (await isSoldOut(itemSlug)) {
        return NextResponse.json({ error: "One or more items are sold out." }, { status: 409 });
      }
    }
    for (const item of items) {
      const itemSlug = typeof item.metadata?.slug === "string" ? item.metadata.slug : "";
      const itemSize = typeof item.metadata?.size === "string" ? item.metadata.size : undefined;
      const itemColor = typeof item.metadata?.color === "string" ? item.metadata.color : undefined;
      const itemQty = typeof item.quantity === "number" ? item.quantity : 1;
      if (itemSize) {
        const stock = await assertEnoughStock(itemSlug, itemSize, itemQty, itemColor);
        if (!stock.ok) {
          return NextResponse.json({ error: stock.message }, { status: 409 });
        }
      }
    }
    for (const item of items) {
      const itemSlug = typeof item.metadata?.slug === "string" ? item.metadata.slug : "";
      const resolvedPriceId = await resolvePriceId(item.priceId);
      const qty = typeof item.quantity === "number" ? item.quantity : 1;
      lineItems.push({ price: resolvedPriceId, quantity: qty });
      cartMetaCompact.push({
        p: resolvedPriceId,
        s: typeof item.metadata?.size === "string" ? item.metadata.size : undefined,
        q: qty,
        u: itemSlug || undefined,
        c: typeof item.metadata?.color === "string" ? item.metadata.color : undefined,
      });
      if (itemSlug !== "2-man-sticker") {
        allStickers = false;
      }
    }

    const shippingRateDefault = process.env.STRIPE_SHIPPING_RATE_ID; // optional
    const shippingRateSticker = process.env.STRIPE_SHIPPING_RATE_ID_STICKER; // optional
    let shippingRateId =
      allStickers && shippingRateSticker ? shippingRateSticker : shippingRateDefault;
    const batchSlugs = items.map((item) =>
      typeof item.metadata?.slug === "string" ? item.metadata.slug : ""
    );
    const allFreeShipping =
      batchSlugs.length > 0 && batchSlugs.every((s) => isFreeShippingSlug(s));
    if (allFreeShipping) {
      shippingRateId = undefined;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      allow_promotion_codes: true,
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: shippingRateId ? [{ shipping_rate: shippingRateId }] : undefined,
      metadata: {
        cart: JSON.stringify(cartMetaCompact),
      },
      payment_intent_data: {
        metadata: {
          cart: JSON.stringify(cartMetaCompact),
        },
      },
      custom_text: {
        submit: { message: `Thanks! Your selected sizes are saved with the order.` },
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    const message = typeof err === "object" && err && "message" in err ? (err as { message?: string }).message : "Failed to create checkout session";
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


