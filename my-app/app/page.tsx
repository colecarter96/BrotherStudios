import Image from 'next/image';
import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      <section className="text-black h-[100dvh] pt-24" data-scroll-section>
        <div className="h-full flex items-center justify-center">
          <Link href="/shop" className="block">
            {/* Mobile: full-width square; Desktop: centered square with space around */}
            <div className="relative mx-auto w-screen aspect-square md:w-[70dvh] md:h-[70dvh] md:aspect-auto">
              <Image
                src="/twoBlurPoster1.png"
                alt="Two Brothers — Shop"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
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
