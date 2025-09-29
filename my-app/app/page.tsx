import Image from 'next/image';
import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      <section
        className="h-[90dvh] flex items-center justify-center bg-blue-200"
        data-scroll-section
        // style={{ backgroundImage: "url('https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max')" }}
      >
        <Image
          src="https://www.highsnobiety.com/static-assets/dato/1663200675-stussy-fw-19-campaign-003.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-gray-200" data-scroll data-scroll-speed="5">
          Two Brothers
        </h1>
      </section>

      

      <section
        className="h-[60dvh] flex items-center justify-center bg-white"
        data-scroll-section
      >
        <h1 className="text-3xl md:text-6xl font-bold mx-[5%] md:mx-[15%]" data-scroll data-scroll-speed="-4">
          A lifestyle brand born from brotherhood - digital stories and apparel that is built to last
        </h1>
      </section>
      <section className="text-black bg-white" data-scroll-section>
        <Footer />
      </section>
      

    </LocomotiveScrollWrapper>
  );
}
