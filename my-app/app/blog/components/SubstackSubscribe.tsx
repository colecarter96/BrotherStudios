type Props = {
  publicationUrl: string;
  className?: string;
};

export default function SubstackSubscribe({ publicationUrl, className = "" }: Props) {
  const subscribeHref = `${publicationUrl}/subscribe`;

  return (
    <div className={`flex justify-center ${className}`} aria-label="Newsletter signup">
      <a
        href={subscribeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-2.5 text-sm font-semibold tracking-tight bg-black text-white"
      >
        SUBSCRIBE
      </a>
    </div>
  );
}
