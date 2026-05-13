import LocomotiveScrollWrapper from "./components/LocomotiveScrollWrapper";
import Footer from "./components/Footer";
import HomeVisualCarousel from "./components/HomeVisualCarousel";
import HomeDropTeaser from "./components/HomeDropTeaser";

const dropTeaserOn =
  process.env.NEXT_PUBLIC_DROP_TEASER === "1" || process.env.NEXT_PUBLIC_DROP_TEASER === "true";

export default function Home() {
  return (
    <LocomotiveScrollWrapper>
      {dropTeaserOn ? (
        <HomeDropTeaser
          headline={process.env.NEXT_PUBLIC_DROP_TEASER_HEADLINE}
          subline={process.env.NEXT_PUBLIC_DROP_TEASER_SUBLINE}
        />
      ) : (
        <HomeVisualCarousel />
      )}

      <section className="text-black" data-scroll-section>
        <Footer />
      </section>

    </LocomotiveScrollWrapper>
  );
}
