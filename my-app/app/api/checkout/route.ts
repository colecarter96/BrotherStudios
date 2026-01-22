import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CheckoutRequestBody;
  const isBatch = "items" in body;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const slug = req.nextUrl.searchParams.get("slug") || "";
  const successUrl =
    process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL ||
    `${req.nextUrl.origin}/shop${slug ? `/${slug}` : ""}?success=1`;
  const cancelUrl =
    process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL ||
    `${req.nextUrl.origin}/shop${slug ? `/${slug}` : ""}?canceled=1`;

  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

  try {
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
      const itemSlug = typeof metadata?.slug === "string" && metadata.slug ? String(metadata.slug) : slug;
      const shippingRateDefault = process.env.STRIPE_SHIPPING_RATE_ID; // optional
      const shippingRateSticker = process.env.STRIPE_SHIPPING_RATE_ID_STICKER; // optional
      const shippingRateId =
        itemSlug === "2-man-sticker" && shippingRateSticker ? shippingRateSticker : shippingRateDefault;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: resolvedPriceId,
            quantity,
          },
        ],
        shipping_address_collection: { allowed_countries: ["US"] },
        shipping_options: shippingRateId ? [{ shipping_rate: shippingRateId }] : undefined,
        metadata: {
          slug,
          ...(metadata || {}),
        },
        payment_intent_data: {
          metadata: {
            slug,
            ...(metadata || {}),
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
    const { items, metadata } = body as Extract<CheckoutRequestBody, { items: CheckoutLineItem[] }>;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const lineItems: { price: string; quantity?: number }[] = [];
    const cartMetaCompact: Array<{ size?: string | null; quantity?: number | null }> = [];
    let allStickers = true;
    for (const item of items) {
      const resolvedPriceId = await resolvePriceId(item.priceId);
      lineItems.push({ price: resolvedPriceId, quantity: item.quantity ?? 1 });
      cartMetaCompact.push({
        size: typeof item.metadata?.size === "string" ? item.metadata.size : null,
        quantity: typeof item.quantity === "number" ? item.quantity : 1,
      });
      const itemSlug = typeof item.metadata?.slug === "string" ? item.metadata.slug : "";
      if (itemSlug !== "2-man-sticker") {
        allStickers = false;
      }
    }

    const shippingRateDefault = process.env.STRIPE_SHIPPING_RATE_ID; // optional
    const shippingRateSticker = process.env.STRIPE_SHIPPING_RATE_ID_STICKER; // optional
    const shippingRateId =
      allStickers && shippingRateSticker ? shippingRateSticker : shippingRateDefault;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: shippingRateId ? [{ shipping_rate: shippingRateId }] : undefined,
      metadata: {
        slug,
        ...(metadata || {}),
        cart: JSON.stringify(cartMetaCompact),
      },
      payment_intent_data: {
        metadata: {
          slug,
          ...(metadata || {}),
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
    // eslint-disable-next-line no-console
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


