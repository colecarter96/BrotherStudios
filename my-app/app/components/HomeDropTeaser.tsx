import Image from "next/image";
import Link from "next/link";

type Props = {
  headline?: string;
  subline?: string;
};

const DEFAULT_HEADLINE = "Working on a new drop.";

/**
 * Between-drops home: logo + short line + archive / Instagram.
 * NEXT_PUBLIC_DROP_TEASER=1 — optional NEXT_PUBLIC_DROP_TEASER_HEADLINE, NEXT_PUBLIC_DROP_TEASER_SUBLINE
 */
export default function HomeDropTeaser({ headline, subline }: Props) {
  const title = headline?.trim() || DEFAULT_HEADLINE;
  const body = (subline?.replace(/\\n/g, "\n") ?? "").trim();

  return (
    <section
      className="min-h-[88dvh] md:min-h-[92vh] flex flex-col items-center justify-center gap-8 md:gap-10 px-6 pt-24 pb-16 md:pt-0 md:pb-0 bg-white text-black text-center"
      data-scroll-section
    >
      <Image
        src="/logo2.0.webp"
        alt="Brother Studios"
        width={4000}
        height={1395}
        className="w-[min(70vw,300px)] h-auto max-w-full shrink-0"
        sizes="(max-width: 768px) 85vw, 420px"
        priority
      />

      <div className="flex max-w-md flex-col items-center gap-2">
        <h1 className="text-lg tracking-tighter md:text-2xl">{title}</h1>
        <h1 className="tracking-tighter md:text-xl"> Follow the insta to stay up to date on new drops, or shop previous drops now</h1>
        {body ? (
          <p className="text-base font-medium leading-snug text-black/65 whitespace-pre-line md:text-lg">
            {body}
          </p>
        ) : null}
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center border border-black px-6 py-3 text-sm font-semibold tracking-wider transition-colors hover:bg-black hover:text-white md:py-2.5 md:text-base"
        >
          SHOP THE ARCHIVE
        </Link>
        <a
          href="https://instagram.com/twbrthrs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-black bg-black px-6 py-3 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-black/85 md:py-2.5 md:text-base"
        >
          INSTAGRAM
        </a>
      </div>
    </section>
  );
}
