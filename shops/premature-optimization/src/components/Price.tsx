const format = new Intl.NumberFormat("fa-IR");

export default function Price({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return <span className={className}>{format.format(value)} تومان</span>;
}
