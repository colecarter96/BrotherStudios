import Link from "next/link";
import Image from "next/image";
import DATA, { type PlatformAccount } from "./data";
import styles from "./brandkit.module.css";

export const dynamic = "force-static";

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
  return accounts.reduce((sum, a) => sum + (typeof a.followers === "number" ? Math.max(0, Math.floor(a.followers)) : 0), 0);
}

function AccountRow({ a }: { a: PlatformAccount }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <Link href={a.url} target="_blank" className="underline underline-offset-4 text-sm md:text-base">
        @{a.handle}
      </Link>
      <div className="text-right">
        <div className="text-sm md:text-base font-medium tabular-nums">{formatCompact(a.followers)}</div>
        {typeof a.likes === "number" ? (
          <div className="text-[11px] md:text-xs text-black/60 tabular-nums">{formatCompact(a.likes)} likes</div>
        ) : null}
      </div>
    </div>
  );
}

export default async function BrandKitPage() {
  const data = DATA;
  const tiktok = sumFollowers(data.accounts.tiktok);
  const ig = sumFollowers(data.accounts.instagram);
  const yt = sumFollowers(data.accounts.youtube);
  const total = tiktok + ig + yt;
  const pillarImages = ["/Btiktok1.png", "/Btiktok2.png", "/Byoutube1.png", "/Byoutube2.png"];
  const pillarAspects = ["aspect-5/7", "aspect-5/7", "aspect-video", "aspect-video"];
  const subtitle =
    Array.isArray(data.tags) && data.tags.length
      ? data.tags.join(" / ").toUpperCase()
      : undefined;
  const heroSrc =
    typeof data.heroImage === "string" && data.heroImage.trim()
      ? data.heroImage.startsWith("http")
        ? data.heroImage
        : data.heroImage.startsWith("/")
        ? data.heroImage
        : `/${data.heroImage}`
      : null;
  return (
    <main className="mx-auto w-screen max-w-none">
      {/* Hero - full bleed */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {heroSrc ? (
          <Image src={heroSrc} alt={`${data.brandName} hero`} fill priority className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-black via-[#0b0b0b] to-[#1a1a1a]" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/30 to-black/10" />
        <div className="relative z-10 h-full w-full">
          {/* Top-right combined audience pill */}
          <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-white backdrop-blur">
            <span className="text-xs uppercase tracking-wider opacity-80">Combined Audience</span>
            <span className="text-lg font-semibold tabular-nums">{formatCompact(total)}+</span>
          </div>
          <div className="mx-auto w-[92vw] max-w-6xl h-full flex flex-col justify-end pb-12 md:pb-16">
            <div className={styles.fadeUp1}>
              {subtitle ? (
                <div className="text-white/90 text-xs md:text-sm tracking-wide mb-1">{subtitle}</div>
              ) : null}
              <h1 className="text-white text-3xl md:text-5xl font-semibold tracking-tighter">{data.brandName}</h1>
              {data.tagline ? (
                <p className="mt-2 text-white/90 text-sm md:text-lg max-w-2xl">{data.tagline}</p>
              ) : null}
            </div>
            <div className={`mt-5 md:mt-7 flex items-center gap-3 ${styles.fadeUp2}`}>
              <Link
                href={`mailto:${data.contacts.email}?subject=Partnership%20Inquiry%20-%20${encodeURIComponent(data.brandName)}`}
                className="inline-flex items-center justify-center px-5 py-3 bg-black text-white font-semibold text-sm md:text-base"
              >
                Partner with us
              </Link>
              <a
                href="https://www.youtube.com/@bryceandcolecarter"
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 border border-white text-white font-semibold text-sm md:text-base hover:bg-white/20"
              >
                View content
              </a>
              {/* hide bottom pill now that we placed it top-right */}
            </div>
            <div className="mt-4 md:mt-6 flex items-center gap-3 text-white text-xs md:text-sm">
              {data.location ? <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur">{data.location}</span> : null}
              {data.availability ? <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur">{data.availability}</span> : null}
            </div>
          </div>
        </div>
      </section>

      {/* About band (overlapping the hero) */}
      <section className="mx-auto w-[92vw] max-w-6xl -mt-10 md:-mt-14 relative z-20">
        <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-7">
          <div className="grid grid-cols-1 gap-4 md:gap-6 items-stretch">
            <div>
              <h2 className="text-base md:text-lg font-semibold tracking-tight">About Us</h2>
              <p className="mt-3 text-sm md:text-base text-black/80 leading-relaxed whitespace-pre-line">{data.about}</p>
              {Array.isArray(data.tags) && data.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.tags.map((t) => (
                    <span key={t} className="inline-flex items-center font-bold px-3 py-1 text-sm md:text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-[92vw] max-w-6xl border-t border-black/10 my-8 md:my-10" />

      {/* One brand heading above channels */}
      <section className="mx-auto w-[92vw] max-w-6xl mt-6 md:mt-8">
        <h2 className="text-base md:text-lg font-semibold tracking-tight">One Creator Brand. Multiple Channels.</h2>
      </section>

      {/* Channels */}
      <section className="mx-auto w-[92vw] max-w-6xl mt-6 md:mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className={`bg-white rounded-xl p-5 md:p-6 ${styles.fadeUp1}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-base md:text-lg font-semibold tracking-tight">TikTok</h3>
              <div className="text-lg md:text-2xl font-semibold tabular-nums">{formatCompact(tiktok)}</div>
            </div>
            <div className="mt-3">
              {data.accounts.tiktok.map((a) => (
                <AccountRow key={a.handle} a={a} />
              ))}
            </div>
          </div>
          <div className={`bg-white rounded-xl p-5 md:p-6 ${styles.fadeUp2}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-base md:text-lg font-semibold tracking-tight">Instagram</h3>
              <div className="text-lg md:text-2xl font-semibold tabular-nums">{formatCompact(ig)}</div>
            </div>
            <div className="mt-3">
              {data.accounts.instagram.map((a) => (
                <AccountRow key={a.handle} a={a} />
              ))}
            </div>
          </div>
          <div className={`bg-white rounded-xl p-5 md:p-6 ${styles.fadeUp3}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-base md:text-lg font-semibold tracking-tight">YouTube</h3>
              <div className="text-lg md:text-2xl font-semibold tabular-nums">{formatCompact(yt)}</div>
            </div>
            <div className="mt-3">
              {data.accounts.youtube.map((a) => (
                <AccountRow key={a.handle} a={a} />
              ))}
            </div>
          </div>
        </div>
        {/* <p className="mt-3 text-xs text-black/50">Update numbers in app/brandkit/data.ts</p> */}
      </section>

      {/* Divider */}
      <div className="mx-auto w-[92vw] max-w-6xl border-t border-black/10 my-10 md:my-12" />

      {/* Content pillars */}
      {Array.isArray(data.pillars) && data.pillars.length > 0 ? (
        <section className="mx-auto w-[92vw] max-w-6xl my-10 md:my-14">
          <h2 className="text-base md:text-lg font-semibold tracking-tight mb-3">Content built around the experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {data.pillars.map((p, i) => (
              <div key={`${p.title}-${i}`} className="bg-white p-4 md:p-5">
                {pillarImages[i] ? (
                  <div className={`relative w-full ${pillarAspects[i] ?? "aspect-video"} mb-3 overflow-hidden rounded-sm`}>
                    <Image src={pillarImages[i]!} alt={p.title} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="text-sm md:text-base font-semibold">
                  {String(i + 1).padStart(2, "0")}. {p.title}
                </div>
                <p className="mt-2 text-xs md:text-sm text-black/70 leading-relaxed">{p.blurb}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Divider */}
      {(Array.isArray(data.offerings) && data.offerings.length) || (Array.isArray(data.industries) && data.industries.length) ? (
        <div className="mx-auto w-[92vw] max-w-6xl border-t border-black/10 my-10 md:my-12" />
      ) : null}

      {/* Ways we can build + Who we want to work with */}
      {(Array.isArray(data.offerings) && data.offerings.length) || (Array.isArray(data.industries) && data.industries.length) ? (
        <section className="mx-auto w-[92vw] max-w-6xl my-10 md:my-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {Array.isArray(data.offerings) && data.offerings.length ? (
              <div className="bg-white p-5 md:p-6">
                <h3 className="text-base md:text-lg font-semibold tracking-tight">Ways we can build a trip around your brand</h3>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {data.offerings.map((o) => (
                    <li key={o} className="text-sm md:text-base">{o}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {Array.isArray(data.industries) && data.industries.length ? (
              <div className="bg-white p-5 md:p-6">
                <h3 className="text-base md:text-lg font-semibold tracking-tight">Who we want to work with</h3>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {data.industries.map((o) => (
                    <li key={o} className="text-sm md:text-base font-semibold">{o}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Divider */}
      {Array.isArray(data.featured) && data.featured.length > 0 ? (
        <div className="mx-auto w-[92vw] max-w-6xl border-t border-black/10 my-10 md:my-12" />
      ) : null}

      {/* Featured content (optional) */}
      {Array.isArray(data.featured) && data.featured.length > 0 ? (
        <section className="mx-auto w-[92vw] max-w-6xl my-12">
          <h2 className={`text-lg md:text-xl font-semibold tracking-tight mb-3 ${styles.fadeUp1}`}>Selected Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {data.featured.map((f, i) => (
              <Link
                key={`${f.href || f.image || i}`}
                href={f.href || "#"}
                target={f.href ? "_blank" : undefined}
                className="group block bg-white overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                {f.image ? (
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image src={f.image} alt={f.title || "Featured"} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="text-sm md:text-base font-semibold">{f.title || "Featured"}</div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Divider */}
      <div className="mx-auto w-[92vw] max-w-6xl border-t border-black/10 my-10 md:my-12" />

      {/* Contact footer */}
      <section className="mx-auto w-[92vw] max-w-6xl my-12">
        <div className={`bg-white p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${styles.fadeUp1}`}>
          <div>
            <div className="text-base md:text-lg font-semibold tracking-tight">Let’s build something together.</div>
            <div className="text-sm md:text-base text-black/70 mt-1">{data.contacts.email}</div>
          </div>
          <Link
            href={`mailto:${data.contacts.email}?subject=Partnership%20Inquiry%20-%20${encodeURIComponent(data.brandName)}`}
            className="inline-flex items-center justify-center px-5 py-3 bg-black text-white font-semibold text-sm md:text-base"
          >
            Start a partnership
          </Link>
        </div>
      </section>
    </main>
  );
}

