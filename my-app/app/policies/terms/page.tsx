export default function TermsPage() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral max-w-none mt-8">
          <p>
            Welcome to Two Brothers. By accessing or using our website, you agree to these Terms. If you do
            not agree, do not use the site.
          </p>
          <h2>Ordering</h2>
          <p>
            All orders are offers to purchase. We may refuse or cancel for any reason, including suspected
            fraud, inventory errors, or pricing mistakes. Prices and availability may change without notice.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, logos, and media, is owned by Two Brothers or
            our licensors and protected by law. You may not copy, modify, distribute, or create derivative
            works without permission.
          </p>
          <h2>User Submissions & UGC</h2>
          <p>
            If you submit or post content (e.g., comments, photos), you grant us a worldwide, royalty-free
            license to use, display, reproduce, and adapt that content for site operations and promotion. You
            are responsible for your submissions and must have rights to the content. We may moderate or remove
            content at our discretion. See our Community Guidelines for details.
          </p>
          <h2>Disclaimer; Limitation of Liability</h2>
          <p>
            The site and products are provided “as is” to the fullest extent permitted by law. To the maximum
            extent allowed, Two Brothers will not be liable for indirect, incidental, or consequential damages.
          </p>
          <h2>Returns, Shipping, and Promotions</h2>
          <p>
            Returns and shipping are governed by our Returns Policy and Shipping Policy. Promotions may carry
            additional terms stated at offer time.
          </p>
          <h2>Governing Law; Disputes</h2>
          <p>
            These Terms are governed by the laws of the State of California, without regard to conflicts of
            law. Any disputes will be resolved in San Diego County, California, through binding arbitration on
            an individual basis (no class actions), to the extent permitted by law.
          </p>
          <h2>Contact</h2>
          <p>
            Questions? Email us at the.twobrothers.studios@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}

