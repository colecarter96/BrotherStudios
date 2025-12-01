import Image from 'next/image';
import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      <section
        className="h-[100dvh] flex items-center justify-center bg-white"
        data-scroll-section
        // style={{ backgroundImage: "url('https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max')" }}
      >
        {/* <Image
          src="https://static.vecteezy.com/system/resources/previews/002/223/740/large_2x/horizontal-cement-and-concrete-texture-for-pattern-and-design-free-photo.jpg"
          alt="Background"
          fill
          className="object-cover"
        /> */}
        <h1 className="hidden">Two Brothers Streetwear</h1>
        {/* <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-black" data-scroll data-scroll-speed="5">
          Two Brothers
        </h1> */}

        <div className="relative mx-auto w-[90vw] md:w-[80vw] h-[80vh] max-w-[1400px]">
          <video
            className="w-full h-full object-contain"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            aria-label="Brand hero video"
          >
            <source src="/output_6s.webm" type="video/webm" />
            <source src="/output_6s.mp4" type="video/mp4" />
          </video>
          {/* Mobile: stationary overlay (no Locomotive) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center md:hidden">
            <span className="block text-[#333333] font-bold text-5xl sm:text-6xl tracking-tight text-center">
              TWO BROTHERS
            </span>
          </div>
          {/* Desktop: parallax overlay */}
          <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center" data-scroll data-scroll-speed="-5">
            <Image
              src="/twoBrothersCapitalDark.svg"
              alt="Two Brothers Logo"
              width={1400}
              height={800}
              className="w-3/4 md:w-2/3 h-auto object-contain"
            />
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

      <section
        id="brand"
        className="relative z-0 overflow-hidden h-[40dvh] md:h-[60dvh] flex items-center justify-center bg-white"
        data-scroll-section
      >
        <h1
          className="text-3xl lg:text-5xl xl:text-6xl pt-0 font-bold mx-[5%] md:mx-[15%]"
        >
          A lifestyle brand born from brotherhood - digital stories and apparel that is built to last
        </h1>
      </section>
      
      <section className="text-black bg-white" data-scroll-section>
        <Footer />
      </section>

      
      

    </LocomotiveScrollWrapper>
  );
}
