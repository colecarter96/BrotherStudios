import { NextRequest, NextResponse } from "next/server";

type CheckoutRequestBody = {
  priceId: string;
  quantity?: number;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CheckoutRequestBody;
  const { priceId, quantity = 1, metadata } = body;

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const slug = req.nextUrl.searchParams.get("slug") || "";
  const successUrl = process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL || `${req.nextUrl.origin}/shop/${slug}?success=1`;
  const cancelUrl = process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL || `${req.nextUrl.origin}/shop/${slug}?canceled=1`;

  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

  try {
    // Allow passing either a Price ID (price_...) or Product ID (prod_...)
    let resolvedPriceId = priceId;
    if (priceId.startsWith("prod_")) {
      const product = await stripe.products.retrieve(priceId);
      const dp = product.default_price;
      if (typeof dp === "string" && dp.startsWith("price_")) {
        resolvedPriceId = dp;
      } else {
        // Fallback to first active price for the product
        const prices = await stripe.prices.list({ product: product.id, active: true, limit: 1 });
        if (prices.data[0]?.id) {
          resolvedPriceId = prices.data[0].id;
        } else {
          return NextResponse.json({ error: "No active price found for product" }, { status: 400 });
        }
      }
    }

    const shippingRateId = process.env.STRIPE_SHIPPING_RATE_ID; // optional

    const size = typeof metadata?.size === "string" && metadata.size ? String(metadata.size) : undefined;
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
  } catch (err) {
    const message = typeof err === "object" && err && "message" in err ? (err as { message?: string }).message : "Failed to create checkout session";
    // eslint-disable-next-line no-console
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


