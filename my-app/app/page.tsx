import Image from 'next/image';
import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      <section className="text-black pt-24 pb-16" data-scroll-section>
        {/* Mobile grid (default) */}
        <div className="block md:hidden mx-auto w-[97vw] max-w-[1200px]">
          <div className="grid grid-cols-2 gap-1">
            {/* Row 1: IMG1 | NONE */}
            <Link href="/shop" className="relative overflow-hidden aspect-square">
              <Image src="/twoBlurPoster1.png" alt="Shop" fill className="object-cover" />
            </Link>
            <div className="aspect-square" />
            {/* Row 2: IMG2 | IMG3 */}
            <Link href="/shop" className="relative overflow-hidden aspect-square">
              <Image src="/sexPVisual2.jpg" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden aspect-square">
              <Image src="/twoTeeVisual1.png" alt="Shop" fill className="object-cover" />
            </Link>
            {/* Row 3: IMG | IMG5 */}
            <Link href="/shop" className="relative overflow-hidden aspect-square">
              <Image src="/championVisual.jpg" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden aspect-square">
              <Image src="/brotherVisual.png" alt="Shop" fill className="object-cover" />
            </Link>
            {/* Row 4: IMG6 | IMG7 */}
            <Link href="/shop" className="relative overflow-hidden aspect-square">
              <Image src="/dogTeeVisual.jpg" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden aspect-square">
              <Image src="/dickiesVisual3.jpeg" alt="Shop" fill className="object-cover" />
            </Link>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block mx-auto w-[96vw] max-w-[1600px]">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
          >
            {/* Top-right 2x2 */}
            <Link href="/shop" className="relative overflow-hidden col-start-3 col-span-2 row-start-1 row-span-2 aspect-square">
              <Image src="/sexPVisual2.jpg" alt="Shop" fill className="object-cover" />
            </Link>
            {/* Top-left singles (r1-2, c1-2) */}
            <Link href="/shop" className="relative overflow-hidden col-start-1 col-span-1 row-start-1 aspect-square">
              <Image src="/homePoster1.png" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden col-start-2 col-span-1 row-start-1 aspect-square">
              <Image src="/twoBlurPoster1.png" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden col-start-1 col-span-1 row-start-2 aspect-square">
              <Image src="/twoTeeVisual1.png" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden col-start-2 col-span-1 row-start-2 aspect-square">
              <Image src="/brotherVisual.png" alt="Shop" fill className="object-cover" />
            </Link>
            {/* Bottom-left 2x2 */}
            <Link href="/shop" className="relative overflow-hidden col-start-1 col-span-2 row-start-3 row-span-2 aspect-square">
              <Image src="/championVisual.jpg" alt="Shop" fill className="object-cover" />
            </Link>
            {/* Bottom-right singles (r3-4, c3-4) */}
            <Link href="/shop" className="relative overflow-hidden col-start-3 col-span-1 row-start-3 aspect-square">
              <Image src="/dogTeeVisual.jpg" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden col-start-4 col-span-1 row-start-3 aspect-square">
              <Image src="/homePoster2.png" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden col-start-3 col-span-1 row-start-4 aspect-square">
              <Image src="/dickiesVisual3.jpeg" alt="Shop" fill className="object-cover" />
            </Link>
            <Link href="/shop" className="relative overflow-hidden col-start-4 col-span-1 row-start-4 aspect-square">
              <Image src="/2manblackstickimg.svg" alt="Shop" fill className="object-cover" />
            </Link>
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
