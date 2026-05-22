import Link from "next/link";
import Footer from "../components/Footer";
import SubstackSubscribe from "./components/SubstackSubscribe";
import { formatPostDate, getSubstackPosts, getSubstackPublicationUrl } from "@/lib/substack";

export const metadata = {
  title: "Blog | Two Brothers",
  description: "Writing from Two Brothers.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getSubstackPosts();
  const publicationUrl = getSubstackPublicationUrl();

  return (
    <>
      <main className="max-w-2xl mx-auto pt-40 lg:pt-60 pb-24 px-4 min-h-[80dvh]">
        {posts.length === 0 ? (
          <p className="text-sm opacity-60">No posts yet.</p>
        ) : (
          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tighter group-hover:opacity-70 transition">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium opacity-60">{formatPostDate(post.pubDate)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <SubstackSubscribe publicationUrl={publicationUrl} className="mt-16" />
      </main>
      <Footer />
    </>
  );
}
