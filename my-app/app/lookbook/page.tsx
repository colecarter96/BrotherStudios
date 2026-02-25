import Image from "next/image";

const images: string[] = [
  "/sexPVisual2.jpg",
  "/twoBlurPoster1.png",
  
  "/twoTeeVisual1.png",
  "/championVisual.jpg",
  "/brotherVisual.png",
  "/dogTeeVisual.jpg",
  "/dickiesVisual3.jpeg",
  "/dickiesVisual1.jpeg",
  "/homePoster1.png",
  "/homePoster2.png",
  "/championStudioFront.png",
  "/championBack.jpg",
  "/stickerStudio.png",
  "/twoTeeStudio.png",
  "/twoTeeBack.png",
  "/brotherStudio.png",
  "/dogTeeFront.png",
  "/sexPanthersStudioFront.png",
  "/dickiesStudioFront.png",
];

export default function LookbookPage() {
  return (
    <main className="bg-white text-black pt-24 pb-16">
      <section className="mx-auto w-[92vw] max-w-[1600px]">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">COLLECTION 1</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="relative aspect-square overflow-hidden">
              <div className="absolute -inset-[2px]">
                <Image
                  src={src}
                  alt="Lookbook image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  priority={i < 6}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

