import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from './components/Footer';
import HomeVisualCarousel from "./components/HomeVisualCarousel";

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      <HomeVisualCarousel />

      <section className="text-black" data-scroll-section>
        <Footer />
      </section>

    </LocomotiveScrollWrapper>
  );
}
