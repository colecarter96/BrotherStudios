export default function AcknowledgementsPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Acknowledgements</h1>
        <div className="prose prose-neutral max-w-none mt-8">
          <h2>Credits</h2>
          <ul>
            <li>Photography: Two Brothers Studio (unless otherwise credited)</li>
            <li>Fonts: Pretendard (see license)</li>
            <li>Hosting & Infra: Vercel, Next.js</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

