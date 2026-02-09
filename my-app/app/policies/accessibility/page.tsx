export default function AccessibilityPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Accessibility</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral max-w-none mt-8">
          <p>
            We aim to meet WCAG 2.1 AA where possible. If you encounter any barriers using our site or need an
            alternative format, email the.twobrothers.studios@gmail.com and we will help.
          </p>
        </div>
      </section>
    </main>
  );
}

