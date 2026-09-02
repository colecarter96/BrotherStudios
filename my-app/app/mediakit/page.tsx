import Link from "next/link";
import Image from "next/image";
import DATA, { type PlatformAccount } from "./data";
import CopyEmailButton from "./CopyEmailButton";
import styles from "./mediakit.module.css";

export const dynamic = "force-dynamic";

function formatCompact(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n) || n <= 0) return "—";
  try {
    return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  } catch {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
  }
}

function sumFollowers(accounts: PlatformAccount[]): number {
  return accounts.reduce(
    (sum, a) => sum + (typeof a.followers === "number" ? Math.max(0, Math.floor(a.followers)) : 0),
    0
  );
}

function LinkArrow() {
  return <span aria-hidden="true"> ↗</span>;
}

function AccountRow({ a }: { a: PlatformAccount }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-black/8 last:border-0">
      <Link href={a.url} target="_blank" className="text-sm md:text-base hover:opacity-70 transition-opacity">
        @{a.handle}
        <LinkArrow />
      </Link>
      <div className="text-right">
        <div className="text-sm md:text-base font-medium tabular-nums">{formatCompact(a.followers)}</div>
        {typeof a.likes === "number" ? (
          <div className="text-[11px] md:text-xs text-black/50 tabular-nums">{formatCompact(a.likes)} likes</div>
        ) : null}
      </div>
    </div>
  );
}

function SectionDivider() {
  return <div className="border-t border-black/10" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.1em] text-black mb-4 md:mb-6">
      {children}
    </h2>
  );
}

function AudienceStatRow({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="py-2 border-b border-black/8 last:border-0">
      <div className="flex items-center justify-between gap-4 text-sm md:text-base">
        <span>{label}</span>
        <span className="font-medium tabular-nums shrink-0">{pct.toFixed(1)}%</span>
      </div>
      <div className="mt-1.5 h-1 bg-black/8 rounded-full overflow-hidden">
        <div className="h-full bg-black/70 rounded-full" style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
    </div>
  );
}

export default async function MediaKitPage() {
  const data = DATA;
  const tiktok = sumFollowers(data.accounts.tiktok);
  const ig = sumFollowers(data.accounts.instagram);
  const yt = sumFollowers(data.accounts.youtube);
  const total = tiktok + ig + yt;
  const pillarImages = ["/Btiktok1.png", "/Btiktok2.png", "/Byoutube1.png", "/Byoutube2.png"];
  const pillarAspects = ["aspect-5/7", "aspect-5/7", "aspect-video", "aspect-video"];
  const subtitle =
    Array.isArray(data.tags) && data.tags.length ? data.tags.join(" | ").toUpperCase() : undefined;
  const heroSrc =
    typeof data.heroImage === "string" && data.heroImage.trim()
      ? data.heroImage.startsWith("http")
        ? data.heroImage
        : data.heroImage.startsWith("/")
          ? data.heroImage
          : `/${data.heroImage}`
      : null;

  return (
    <main className="min-h-screen bg-[#f4f4f2] text-black">
      <div className="mx-auto w-[92vw] max-w-6xl pt-10 md:pt-16 pb-20">
        {/* Hero */}
        <section className={`grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-end ${styles.fadeUp1}`}>
          <div>
            {subtitle ? (
              <p className="text-xs md:text-sm font-semibold tracking-[0.18em] text-black/50 mb-3">{subtitle}</p>
            ) : null}
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[0.95]">
              {data.brandName}
            </h1>
            {data.tagline ? (
              <p className="mt-4 text-base md:text-lg text-black/70 max-w-xl leading-relaxed">{data.tagline}</p>
            ) : null}
            <div className="mt-6 flex flex-col items-start">
              <Link
                href={`mailto:${data.contacts.email}?subject=Partnership%20Inquiry%20-%20${encodeURIComponent(data.brandName)}`}
                className="inline-flex items-center justify-center px-5 py-3 bg-black text-white font-semibold text-sm md:text-base"
              >
                Partner with us
                <LinkArrow />
              </Link>
              <CopyEmailButton email={data.contacts.email} />
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50 mb-2">View content</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm md:text-base">
                {data.accounts.youtube.map((a) => (
                  <a
                    key={a.handle}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    YouTube @{a.handle}
                    <LinkArrow />
                  </a>
                ))}
                {data.accounts.tiktok.map((a) => (
                  <a
                    key={a.handle}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    TikTok @{a.handle}
                    <LinkArrow />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-black/60">
              {data.location ? <span>{data.location}</span> : null}
              {data.location && data.availability ? <span className="text-black/30">·</span> : null}
              {data.availability ? <span>{data.availability}</span> : null}
            </div>
            <div className="mt-8 inline-flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-semibold tabular-nums tracking-tight">
                {formatCompact(total)}+
              </span>
              <span className="text-sm text-black/50">combined audience</span>
            </div>
          </div>

          {heroSrc ? (
            <div className="relative w-full max-w-sm md:max-w-md md:ml-auto aspect-4/5 overflow-hidden rounded-sm bg-black/5">
              <Image
                src={heroSrc}
                alt={`${data.brandName}`}
                fill
                priority
                sizes="(max-width: 768px) 92vw, 400px"
                className="object-cover object-center"
              />
            </div>
          ) : null}
        </section>

        <div className="my-12 md:my-16">
          <SectionDivider />
        </div>

        {/* About */}
        <section className={styles.fadeUp2}>
          <SectionHeading>About</SectionHeading>
          <p className="text-sm md:text-base text-black/80 leading-relaxed whitespace-pre-line max-w-3xl">
            {data.about}
          </p>
          
        </section>

        <div className="my-12 md:my-16">
          <SectionDivider />
        </div>

        {/* Channels */}
        <section>
          <SectionHeading>Channels</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className={styles.fadeUp1}>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold tracking-tight">TikTok</h3>
                <span className="text-xl font-semibold tabular-nums">{formatCompact(tiktok)}</span>
              </div>
              {data.accounts.tiktok.map((a) => (
                <AccountRow key={a.handle} a={a} />
              ))}
            </div>
            <div className={styles.fadeUp2}>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold tracking-tight">Instagram</h3>
                <span className="text-xl font-semibold tabular-nums">{formatCompact(ig)}</span>
              </div>
              {data.accounts.instagram.map((a) => (
                <AccountRow key={a.handle} a={a} />
              ))}
            </div>
            <div className={styles.fadeUp3}>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold tracking-tight">YouTube</h3>
                <span className="text-xl font-semibold tabular-nums">{formatCompact(yt)}</span>
              </div>
              {data.accounts.youtube.map((a) => (
                <AccountRow key={a.handle} a={a} />
              ))}
            </div>
          </div>
        </section>

        {data.youtubeAudience ? (
          <>
            <div className="my-12 md:my-16">
              <SectionDivider />
            </div>
            <section>
              <SectionHeading>YouTube audience</SectionHeading>
              <div className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wide">Monthly audience</p>
                  <p className="text-2xl md:text-3xl font-semibold tabular-nums tracking-tight">
                    {formatCompact(data.youtubeAudience.monthlyAudience)}
                  </p>
                </div>
                <p className="text-sm text-black/50">{data.youtubeAudience.periodLabel}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Top geographies</h3>
                  <p className="text-xs text-black/50 mb-3">{data.youtubeAudience.periodLabel}</p>
                  {data.youtubeAudience.topGeographies.map((row) => (
                    <AudienceStatRow key={row.country} label={row.country} pct={row.pct} />
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Gender</h3>
                  <p className="text-xs text-black/50 mb-3">{data.youtubeAudience.periodLabel}</p>
                  {data.youtubeAudience.gender.map((row) => (
                    <AudienceStatRow key={row.label} label={row.label} pct={row.pct} />
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Age</h3>
                  <p className="text-xs text-black/50 mb-3">{data.youtubeAudience.periodLabel}</p>
                  {data.youtubeAudience.age.map((row) => (
                    <AudienceStatRow key={row.label} label={row.label} pct={row.pct} />
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : null}

        {Array.isArray(data.pastCollaborations) && data.pastCollaborations.length > 0 ? (
          <>
            <div className="my-12 md:my-16">
              <SectionDivider />
            </div>
            <section>
              <SectionHeading>Past brand collaborations</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                {data.pastCollaborations.map((brand) => {
                  const logo = (
                    <div className="w-full overflow-hidden rounded-sm">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={brand.width}
                        height={brand.height}
                        className="w-full h-auto block"
                      />
                    </div>
                  );
                  return brand.href ? (
                    <a
                      key={brand.name}
                      href={brand.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      {logo}
                    </a>
                  ) : (
                    <div key={brand.name}>{logo}</div>
                  );
                })}
              </div>
            </section>
          </>
        ) : null}

        {Array.isArray(data.pillars) && data.pillars.length > 0 ? (
          <>
            <div className="my-12 md:my-16">
              <SectionDivider />
            </div>
            <section>
              <SectionHeading>Content built around the experience</SectionHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {data.pillars.map((p, i) => (
                  <div key={`${p.title}-${i}`}>
                    {pillarImages[i] ? (
                      <div
                        className={`relative w-full ${pillarAspects[i] ?? "aspect-video"} mb-3 overflow-hidden rounded-sm bg-black/5`}
                      >
                        <Image src={pillarImages[i]!} alt={p.title} fill className="object-cover" />
                      </div>
                    ) : null}
                    <div className="text-sm md:text-base font-semibold">
                      {String(i + 1).padStart(2, "0")}. {p.title}
                    </div>
                    <p className="mt-2 text-xs md:text-sm text-black/60 leading-relaxed">{p.blurb}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {Array.isArray(data.services) && data.services.length > 0 ? (
          <>
            <div className="my-12 md:my-16">
              <SectionDivider />
            </div>
            <section>
              <SectionHeading>Services & offerings</SectionHeading>
              <p className="text-sm md:text-base text-black/60 mb-6 max-w-2xl">
                What brands can book when partnering with us.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {data.services.map((service) => (
                  <li key={service} className="text-sm md:text-base">
                    {service}
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}

        {Array.isArray(data.contentVerticals) && data.contentVerticals.length > 0 ? (
          <>
            <div className="my-12 md:my-16">
              <SectionDivider />
            </div>
            <section>
              <SectionHeading>Content pillars</SectionHeading>
              <p className="text-sm md:text-base text-black/60 mb-6 max-w-2xl">
                The four verticals our content is built around.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                {data.contentVerticals.map((vertical, i) => (
                  <li key={vertical} className="text-sm md:text-base font-semibold">
                    {String(i + 1).padStart(2, "0")}. {vertical}
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}

        {Array.isArray(data.partnershipFormats) && data.partnershipFormats.length > 0 ? (
          <>
            <div className="my-12 md:my-16">
              <SectionDivider />
            </div>
            <section>
              <SectionHeading>How we can promote your brand & build a partnership</SectionHeading>
              <h3 className="text-sm font-semibold mb-5">Formats</h3>
              <ul className="space-y-5 max-w-3xl">
                {data.partnershipFormats.map((format) => (
                  <li key={format.title}>
                    <p className="text-sm md:text-base">
                      <span className="font-semibold">{format.title}</span>
                      <span className="text-black/60"> ⟶ {format.description}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}

        {Array.isArray(data.featured) && data.featured.length > 0 ? (
          <>
            <div className="my-12 md:my-16">
              <SectionDivider />
            </div>
            <section>
              <SectionHeading>Selected work</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.featured.map((f, i) => (
                  <Link
                    key={`${f.href || f.image || i}`}
                    href={f.href || "#"}
                    target={f.href ? "_blank" : undefined}
                    className="group block overflow-hidden rounded-sm bg-black/5"
                  >
                    {f.image ? (
                      <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                          src={f.image}
                          alt={f.title || "Featured"}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="text-sm md:text-base font-semibold">
                          {f.title || "Featured"}
                          <LinkArrow />
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : null}

        <div className="my-12 md:my-16">
          <SectionDivider />
        </div>

        {/* Contact */}
        <section className={`flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${styles.fadeUp1}`}>
          <div>
            <p className="text-xl md:text-2xl font-semibold tracking-tight">Let&apos;s build something together.</p>
            <p className="mt-2 text-sm md:text-base text-black/60">{data.contacts.email}</p>
          </div>
          <div className="shrink-0 flex flex-col items-start">
            <Link
              href={`mailto:${data.contacts.email}?subject=Partnership%20Inquiry%20-%20${encodeURIComponent(data.brandName)}`}
              className="inline-flex items-center justify-center px-5 py-3 bg-black text-white font-semibold text-sm md:text-base shrink-0"
            >
              Start a partnership
              <LinkArrow />
            </Link>
            <CopyEmailButton email={data.contacts.email} />
          </div>
        </section>
      </div>
    </main>
  );
}
