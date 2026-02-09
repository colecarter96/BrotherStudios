export default function ReturnsPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Returns & Refunds</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral max-w-none mt-8">
          <h2>Return window</h2>
          <p>30 days from delivery.</p>
          <h2>Condition</h2>
          <p>Items must be unworn, unwashed, and in original packaging with tags attached.</p>
          <h2>Exclusions</h2>
          <p>Final sale items and gift cards are non-returnable unless defective.</p>
          <h2>Return shipping</h2>
          <p>
            Domestic returns: customer pays return shipping unless the item is defective or we made an error.
            We will provide instructions once your return is approved.
          </p>
          <h2>Refunds</h2>
          <p>Approved refunds are issued to the original payment method within 5–10 business days after receipt.</p>
          <h2>Defects or wrong item</h2>
          <p>Contact support within 7 days of delivery with photos. We will replace or refund as appropriate.</p>
          <h2>Start a return</h2>
          <p>Email the.twobrothers.studios@gmail.com with your order number and reason.</p>
        </div>
      </section>
    </main>
  );
}

