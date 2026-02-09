export default function CookiesPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Cookie Policy</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral max-w-none mt-8">
          <h2>Essential cookies</h2>
          <p>Required for core site features like cart and checkout.</p>
          <h2>Analytics (optional)</h2>
          <p>
            With your consent, we may use analytics to understand site usage. You can accept via the cookie
            banner. You can change your preferences by clearing site data or contacting us.
          </p>
          <h2>Advertising (not active)</h2>
          <p>We are not using advertising cookies at this time.</p>
        </div>
      </section>
    </main>
  );
}

