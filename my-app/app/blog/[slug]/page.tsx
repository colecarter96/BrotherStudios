import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import BlogPostContent from "../components/BlogPostContent";
import SubstackSubscribe from "../components/SubstackSubscribe";
import {
  getSubstackPostBySlug,
  getSubstackPosts,
  getSubstackPublicationUrl,
} from "@/lib/substack";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getSubstackPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getSubstackPostBySlug(slug);
  if (!post) return { title: "Blog | Two Brothers" };
  return {
    title: `${post.title} | Two Brothers`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getSubstackPostBySlug(slug);
  if (!post) notFound();

  const publicationUrl = getSubstackPublicationUrl();

  return (
    <>
      <main className="max-w-2xl mx-auto pt-40 lg:pt-60 pb-24 px-4 min-h-[80dvh]">
        <article>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter mb-8">{post.title}</h1>
          <BlogPostContent html={post.contentHtml} />
        </article>
        <SubstackSubscribe publicationUrl={publicationUrl} className="mt-16" />
      </main>
      <Footer />
    </>
  );
}
