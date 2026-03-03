import Image from 'next/image';
import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      {/* HERO - 90dvh, responsive composition */}
      <section className="text-black pt-0" data-scroll-section>
        <div className="h-[90dvh] w-full">
          {/* Mobile: single image (with slight zoom to avoid side gaps) */}
          <div className="md:hidden relative w-screen h-full overflow-hidden">
            <Image
              src="/oceanSS26TwoDesktop.png"
              alt="SS26"
              fill
              priority
              className="object-cover origin-center scale-[1.06] sm:scale-[1.03]"
              sizes="100vw"
            />
          </div>
          {/* Desktop: single wide image */}
          <div className="hidden md:block relative w-screen h-full overflow-hidden">
            <Image
              src="/oceanSS26TwoDesktop.png"
              alt="SS26 Ocean"
              fill
              priority
              className="object-cover origin-center md:scale-[1.08] lg:scale-[1.04] xl:scale-100 2xl:scale-100 will-change-transform"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* VISUALS GRID: 1x1 on mobile, 2x2 on desktop (edge-to-edge on desktop) */}
      <section className="text-black py-0" data-scroll-section>
        <div className="mx-[calc(-50vw+50%)] w-screen max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
            {[
              
              { src: "/SS26/visuals/climbingTeeBackBlack.jpeg", alt: "Climbing Tee Back Black" },
              
              { src: "/SS26/visuals/climbingTeeBackWhite.jpeg", alt: "Climbing Tee Back White" },
              { src: "/SS26/visuals/climbingTeeFrontBlack.png", alt: "Climbing Tee Front Black" },
              { src: "/SS26/visuals/clubTeeFront.jpeg", alt: "Club Tee Front" },
            ].map((img, i) => (
              <Link key={i} href="/shop" className="group relative block aspect-square overflow-hidden bg-white">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, 50vw"
                  decoding="async"
                />
                <span className="pointer-events-none absolute top-2 right-2 text-xs md:text-sm font-semibold text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  Shop
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      

      

      {/* <section
        data-scroll-section
        className="relative z-[10] overflow-hidden min-h-[80dvh] mx-2 md:mx-20 py-10 pb-16 md:pb-5"
      >
        <div className="pt-26   flex flex-col md:flex-row justify-center space-x-2 md:space-x-8">
          <div className="relative   w-[300px] md:w-[300px] lg:w-[500px] h-[300px] md:h-[300px] lg:h-[500px]"
            data-scroll
            data-scroll-speed="4"
          >
            <Image
              src="/dogTeeBack.png"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>

          <div
            data-scroll
            data-scroll-speed="3"
            className="relative z-10 flex flex-col items-end md:items-start mr-2 md:mr-0 md:ml-2"
          >
            <h1 
              className="font-semibold text-2xl md:text-4xl mb-6 mr-8 md:mr-0 pt-2 md:pt-10 text-black mix-blend-difference transition-all duration-300"
              
            >
              Dog Tee
            </h1>
            
            <Link
              href="/shop"
              className="font-semibold rounded-sm text-xl mr-8 md:mr-0 outline-4 outline-black px-3 py-2 w-fit 
                        text-black bg-white 
                        mix-blend-difference transition-all duration-300 items-end"
            >
              View Now 
            </Link>

          </div>
        </div>
        
        

      </section> */}

      
      
      <section className="text-black" data-scroll-section>
        <Footer />
      </section>

    </LocomotiveScrollWrapper>
  );
}
