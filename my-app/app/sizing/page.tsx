export default function SizingPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Size Guides</h1>
        <p className="mt-3">Sizing charts will be published here for each product type.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-black/10 rounded-lg p-4">
            <h2 className="text-xl font-bold">T-Shirts</h2>
            <p className="mt-2 opacity-70">Coming soon.</p>
          </div>
          <div className="border border-black/10 rounded-lg p-4">
            <h2 className="text-xl font-bold">Hoodies</h2>
            <p className="mt-2 opacity-70">Coming soon.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

