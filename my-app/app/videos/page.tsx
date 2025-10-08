import Footer from "../components/Footer";

type VideoItem = {
  id: string;
  title: string;
  date: string;
  description: string;
};

const videos: VideoItem[] = [
  {
    id: "LWMs_Pztv_0",
    title: "That's Embarrasing - Obama Batman",
    date: "Oct 6, 2025",
    description: "Bryce and Cole tell stories that still haunt and embarrass them.",
  },
];

export default function Videos() {
  return (
    <>
      <section className="max-w-5xl mx-auto pt-40 lg:pt-60 pb-40 px-4 min-h-[80dvh]">
        <div className="flex flex-col space-y-12">
          {videos.map((v) => (
            <article key={v.id} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-2">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter">{v.title}</h2>
                <p className="mt-2 text-sm font-medium opacity-70">{v.date}</p>
                <p className="mt-4 text-base md:text-lg">{v.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
