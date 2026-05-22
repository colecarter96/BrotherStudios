type Props = { html: string };

export default function BlogPostContent({ html }: Props) {
  return (
    <div
      className="blog-content text-[17px] md:text-[18px] leading-[1.75] text-black/90 [&_p]:mt-5 [&_p:first-child]:mt-0 [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tighter [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tighter [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_a]:underline-offset-2 [&_img]:my-8 [&_img]:max-w-full [&_img]:h-auto [&_blockquote]:mt-6 [&_blockquote]:border-l border-black/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_figure]:my-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
