import type { ProductDetails } from "@/app/shop/products";

type ProductDetailsProps = {
  details?: ProductDetails;
};

export default function ProductDetails({ details }: ProductDetailsProps) {
  const hasAnyDetail =
    !!details &&
    (Boolean(details.fabric) ||
      Boolean(details.color) ||
      Boolean(details.care) ||
      Boolean(details.gsm));

  const formatColor = (color?: string | string[]) => {
    if (!color) return "";
    return Array.isArray(color) ? color.join(", ") : color;
  };

  const formatGsm = (gsm?: number | string) => {
    if (gsm === undefined || gsm === null || gsm === "") return "";
    return typeof gsm === "number" ? `${gsm} gsm` : String(gsm);
  };

  return (
    <section className="mt-10">
      <h2 className="text-base md:text-lg font-semibold tracking-tighter">PRODUCT DETAILS</h2>
      {hasAnyDetail ? (
        <dl className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {details?.fabric && (
            <div>
              <dt className="text-sm md:text-base font-semibold tracking-tight">FABRIC</dt>
              <dd className="text-sm md:text-base">{details.fabric}</dd>
            </div>
          )}
          {formatColor(details?.color) && (
            <div>
              <dt className="text-sm md:text-base font-semibold tracking-tight">COLOR</dt>
              <dd className="text-sm md:text-base">{formatColor(details?.color)}</dd>
            </div>
          )}
          {details?.care && (
            <div>
              <dt className="text-sm md:text-base font-semibold tracking-tight">CARE</dt>
              <dd className="text-sm md:text-base">{details.care}</dd>
            </div>
          )}
          {formatGsm(details?.gsm) && (
            <div>
              <dt className="text-sm md:text-base font-semibold tracking-tight">GSM</dt>
              <dd className="text-sm md:text-base">{formatGsm(details?.gsm)}</dd>
            </div>
          )}
        </dl>
      ) : (
        <p className="mt-4 text-sm md:text-base italic">
          Details are out surfing, but you should have everything you need to know! 
          <br></br>
          Feel free to reach out otherwise!
        </p>
      )}
    </section>
  );
}


