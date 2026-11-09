export default function Art({ value, alt }: { value: string; alt: string }) {
  return value.endsWith(".svg") ? <img src={value} alt={alt} /> : <>{value}</>;
}
