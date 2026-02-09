export default function PoliciesIndex() {
  return (
    <main className="bg-white text-black pt-24">
      <section className="mx-auto w-[92vw] max-w-[900px] pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Policies</h1>
        <p className="mt-3 text-base">
          Key information about shopping with Two Brothers.
        </p>
        <ul className="mt-8 space-y-3 text-lg font-semibold underline underline-offset-4">
          <li><a href="/policies/terms">Terms of Service</a></li>
          <li><a href="/policies/privacy">Privacy Policy</a></li>
          <li><a href="/policies/cookies">Cookie Policy</a></li>
          <li><a href="/policies/returns">Returns & Refunds</a></li>
          <li><a href="/policies/shipping">Shipping & Delivery</a></li>
          <li><a href="/policies/accessibility">Accessibility</a></li>
          <li><a href="/policies/acknowledgements">Acknowledgements</a></li>
          <li><a href="/policies/community">Community Guidelines</a></li>
          <li><a href="/policies/dmca">DMCA Policy</a></li>
        </ul>
      </section>
    </main>
  );
}

