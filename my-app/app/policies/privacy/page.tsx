export default function PrivacyPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral max-w-none mt-8">
          <h2>What we collect</h2>
          <p>
            We collect information you provide (e.g., orders, messages) and technical data (device, browser,
            IP, and basic analytics). We use this to operate and improve the site, fulfill orders, and provide
            support.
          </p>
          <h2>Emails and marketing</h2>
          <p>
            If you opt in, we may send emails or SMS about new products and stories. You can unsubscribe at any
            time via a link in the message. We store consent records and honor your choices. We do not sell your
            personal information.
          </p>
          <h2>Cookies</h2>
          <p>
            We use essential cookies and may use analytics with your consent. See our Cookie Policy for details.
          </p>
          <h2>Sharing</h2>
          <p>
            We share data with service providers (e.g., payments, hosting, analytics) under contracts that
            protect your information. We may share if required by law or to protect rights.
          </p>
          <h2>Data retention & security</h2>
          <p>
            We keep data as long as needed for operations and legal obligations. We use reasonable safeguards,
            but no system is 100% secure.
          </p>
          <h2>Your choices</h2>
          <ul>
            <li>Access, update, or delete your data by contacting us.</li>
            <li>Unsubscribe from marketing anytime.</li>
            <li>Adjust cookie preferences in your browser or via our banner.</li>
          </ul>
          <h2>Contact</h2>
          <p>Email: the.twobrothers.studios@gmail.com</p>
        </div>
      </section>
    </main>
  );
}

