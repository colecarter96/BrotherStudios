export default function ShippingPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Shipping & Delivery</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral max-w-none mt-8">
          <h2>Domestic (USA)</h2>
          <ul>
            <li>Handling time: 1–3 business days.</li>
            <li>Carriers: USPS/UPS. Tracking provided by email.</li>
            <li>Free shipping thresholds may be offered on select items or promotions.</li>
          </ul>
          <h2>International</h2>
          <p>
            We are piloting limited international shipping. Some items may ship free internationally, while
            others may incur higher costs due to weight/region. Duties and taxes are the recipient’s
            responsibility unless stated otherwise at checkout.
          </p>
          <p>
            To avoid surprises, we may temporarily limit shipping to the USA for certain releases.
          </p>
          <h2>Lost or damaged</h2>
          <p>
            If your package is lost or arrives damaged, contact us within 7 days. We’ll assist with a carrier
            claim and arrange a replacement or refund where appropriate.
          </p>
          <h2>Preorders</h2>
          <p>Estimated ship windows will be listed on the product page. Delays will be communicated via email.</p>
        </div>
      </section>
    </main>
  );
}

