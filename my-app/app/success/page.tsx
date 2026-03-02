import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = (await searchParams) || {};
  const sessionId = typeof params?.session_id === "string" ? params.session_id : "";
  let order: {
    id: string;
    email?: string | null;
    amount_total?: number | null;
    currency?: string | null;
    lineItems: Array<{ description: string; quantity: number; amount_subtotal: number; currency: string }>;
  } | null = null;
  let errorMsg: string | null = null;

  // Server-side fetch using Stripe secret
  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent"],
      });
      const items = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
      order = {
        id: session.id,
        email: session.customer_details?.email ?? null,
        amount_total: session.amount_total ?? null,
        currency: session.currency ?? null,
        lineItems:
          items.data.map((li) => ({
            description: li.description || (typeof li.price?.nickname === "string" ? li.price!.nickname! : "Item"),
            quantity: li.quantity ?? 1,
            amount_subtotal: li.amount_subtotal ?? 0,
            currency: li.currency ?? (session.currency || "usd"),
          })) || [],
      };
    } catch {
      errorMsg = "We could not load your order details, but your payment may have succeeded.";
    }
  } else {
    errorMsg = "Missing order information.";
  }

  const formatMoney = (amount?: number | null, currency?: string | null) => {
    if (!amount || !currency) return "";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
      }).format(amount / 100);
    } catch {
      return `$${(amount / 100).toFixed(2)}`;
    }
  };

  return (
    <main className="mx-auto w-[92vw] max-w-3xl pt-28 pb-20">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">Thanks for your order</h1>
      <p className="mt-2 text-sm md:text-base">A confirmation email will arrive shortly.</p>

      {errorMsg && (
        <div className="mt-6 p-4 border border-black/10">
          <p className="text-sm">{errorMsg}</p>
          <p className="text-sm mt-1">
            If you need help, contact us at{" "}
            <a className="underline" href="mailto:the.twobrothers.studios@gmail.com">
              the.twobrothers.studios@gmail.com
            </a>
            .
          </p>
        </div>
      )}

      {order && (
        <section className="mt-8 border border-black/10">
          <header className="px-4 py-3 border-b border-black/10 flex items-center justify-between">
            <div className="text-sm">
              <div className="font-semibold">Order</div>
              <div className="opacity-70">{order.id}</div>
            </div>
            <div className="text-sm text-right">
              <div className="font-semibold">Total</div>
              <div>{formatMoney(order.amount_total, order.currency)}</div>
            </div>
          </header>
          <ul className="divide-y divide-black/10">
            {order.lineItems.map((li, i) => (
              <li key={i} className="px-4 py-3 flex items-center justify-between">
                <div className="text-sm md:text-base">
                  <div className="font-semibold">{li.description}</div>
                  <div className="opacity-70">Qty: {li.quantity}</div>
                </div>
                <div className="text-sm md:text-base font-semibold">
                  {formatMoney(li.amount_subtotal, li.currency)}
                </div>
              </li>
            ))}
          </ul>
          <footer className="px-4 py-3 border-t border-black/10 text-sm">
            {order.email ? (
              <div>
                Receipt sent to <span className="font-semibold">{order.email}</span>
              </div>
            ) : (
              <div>Receipt sent to your email.</div>
            )}
          </footer>
        </section>
      )}

      <div className="mt-8 flex items-center justify-end gap-3">
        <Link href="/shop" className="inline-flex items-center justify-center px-5 py-3 bg-black text-white font-semibold text-base">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

