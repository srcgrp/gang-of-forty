import Price from "../../shared/Price.tsx";

export default function OldPrice({ price }: { price: number }) {
  return (
    <p className="item-old-price">
      <Price value={price} />
    </p>
  );
}
