import type { SizeChart } from "@/app/shop/products";

type Props = {
  chart: SizeChart;
};

export default function ProductSizeChart({ chart }: Props) {
  return (
    <div className="overflow-x-auto">
      <p className="mb-3 text-black/60">All measurements in inches.</p>
      <table className="w-full min-w-[280px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-black/15">
            <th scope="col" className="py-2 pr-3 text-left font-semibold text-black/80">
              Size
            </th>
            {chart.sizes.map((s) => (
              <th key={s} scope="col" className="px-2 py-2 text-center font-semibold">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((row) => (
            <tr key={row.label} className="border-b border-black/10">
              <th scope="row" className="py-2 pr-3 text-left font-normal">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={i} className="px-2 py-2 text-center tabular-nums">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
