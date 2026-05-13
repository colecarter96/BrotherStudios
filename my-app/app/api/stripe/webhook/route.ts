import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { applyInventoryFromCheckoutSession } from "@/lib/inventory";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!secret || !stripeKey) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    if (redis) {
      const idemKey = `inv_stripe_evt:${event.id}`;
      const n = await redis.incr(idemKey);
      if (n !== 1) {
        return NextResponse.json({ received: true });
      }
      await redis.expire(idemKey, 60 * 60 * 24 * 60);
    }

    try {
      await applyInventoryFromCheckoutSession({
        id: session.id,
        metadata: session.metadata as Record<string, string> | null,
      });
    } catch (err) {
      if (redis) {
        try {
          await redis.del(`inv_stripe_evt:${event.id}`);
        } catch {
          // ignore
        }
      }
      console.error("Inventory webhook error:", err);
      return NextResponse.json({ error: "inventory_failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
