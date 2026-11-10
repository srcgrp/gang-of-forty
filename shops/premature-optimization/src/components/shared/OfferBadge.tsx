const format = new Intl.NumberFormat("fa-IR");

export default function OfferBadge({ percent }: { percent: number }) {
  return <span className="product-discount">{format.format(percent)}٪</span>;
}
