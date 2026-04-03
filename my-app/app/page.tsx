import Image from 'next/image';
import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      {/* Centered logo */}
      <section className="text-black min-h-[90vh] flex items-center justify-center" data-scroll-section>
        <div className="w-[60vw] max-w-[260px] md:max-w-[360px] lg:max-w-[420px]">
          <Image
            src="/logo2.0.webp"
            alt="Brother Studios"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
            decoding="async"
          />
        </div>
      </section>

      {/* VISUALS GRID: 1x1 on mobile, 2x2 on desktop */}
      <section className="text-black py-0" data-scroll-section>
        <div className="mx-[calc(-50vw+50%)] w-screen max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
            {[
              { src: "/SS26/handsomeWhiteVisual.png", alt: "Handsome Tee White" },
              { src: "/SS26/handsomeBlackVisual.png", alt: "Handsome Tee Black" },
{ src: "/SS26/visuals/climbingTeeBackBlack.jpeg", alt: "Climbing Tee Back Black" },
              { src: "/SS26/visuals/climbingTeeBackWhite.jpeg", alt: "Climbing Tee Back White" },
              
            ].map((img, i) => (
              <Link key={i} href="/shop" className="group relative block aspect-square overflow-hidden bg-white">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, 50vw"
                  decoding="async"
                  unoptimized
                />
                <span className="pointer-events-none absolute top-2 right-2 text-xs md:text-sm font-semibold text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  Shop
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="text-black" data-scroll-section>
        <Footer />
      </section>

    </LocomotiveScrollWrapper>
  );
}
