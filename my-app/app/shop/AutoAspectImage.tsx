import Image from "next/image";
import { slugAutoEdgeTrimStyle } from "./productImage";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** `square` = mobile slug; `viewport` = desktop stack */
  layout?: "square" | "viewport";
};

/** Slug PDP only — `aspect: "auto"` images: full frame + light edge clip (not shop grid cover). */
export default function AutoAspectImage({
  src,
  alt,
  priority,
  sizes = "100vw",
  className = "",
  layout = "square",
}: Props) {
  const frameClass =
    layout === "viewport"
      ? "relative w-full h-[92vh] overflow-hidden"
      : "relative w-full aspect-square overflow-hidden";

  return (
    <div className={`${frameClass} ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain bg-white"
          style={slugAutoEdgeTrimStyle()}
          priority={priority}
        />
      </div>
    </div>
  );
}
