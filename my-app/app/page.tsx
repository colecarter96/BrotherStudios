import Image from 'next/image';
import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      <section
        className="h-[90dvh] flex items-center justify-center bg-white"
        data-scroll-section
        // style={{ backgroundImage: "url('https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max')" }}
      >
        <Image
          src="https://static.vecteezy.com/system/resources/previews/002/223/740/large_2x/horizontal-cement-and-concrete-texture-for-pattern-and-design-free-photo.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-black" data-scroll data-scroll-speed="5">
          Two Brothers
        </h1>
      </section>



      

      

      <section
        data-scroll-section
        className="relative overflow-hidden h-[70dvh] mx-2 md:mx-20"
      >
        <div className="pt-26 flex flex-row justify-center space-x-2 md:space-x-8">
          <div className="relative  w-[150px] md:w-[300px] lg:w-[500px] h-[150px] md:h-[300px] lg:h-[500px]"
            data-scroll
            data-scroll-speed="4"
          >
            <Image
              src="/2manblackstickimg.svg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>

          <div
            data-scroll
            data-scroll-speed="3"
            className="flex flex-col items-end md:items-start mr-2 md:mr-0 md:ml-2"
          >
            <h1 
              className="font-semibold text-2xl md:text-4xl mb-6 pt-2 md:pt-10 text-blakc mix-blend-difference transition-all duration-300"
              
            >
              Two Man Sticker
            </h1>
            
            <Link
              href="/shop"
              className="font-semibold rounded-sm text-xl outline-4 outline-black px-3 py-2 w-fit 
                        text-black bg-white 
                        mix-blend-difference transition-all duration-300 items-end"
            >
              View Now 
            </Link>

          </div>
        </div>
        
        

      </section>

      <section
        id="brand"
        className="relative overflow-hidden h-[60dvh] flex items-center justify-center bg-white"
        data-scroll-section
      >
        <h1
          className="text-3xl md:text-6xl pt-10 font-bold mx-[5%] md:mx-[15%]"
          data-scroll
          data-scroll-speed="1"
          data-scroll-target="#brand"
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
