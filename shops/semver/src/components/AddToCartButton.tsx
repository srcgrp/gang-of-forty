import confetti from "canvas-confetti";
import { useCartStore } from "../hooks/useCartStore";
import type { ProductView } from "../types";
import { notyf } from "../utils/notify";

export default function AddToCartButton({ item, compact = false }: { item: ProductView; compact?: boolean }) {
  const add = useCartStore((state) => state.add);
  const { id, name } = item.product;
  const isOutOfStock = item.stock === 0;

  return (
    <button
      className="buynow-btn"
      type="button"
      data-product-id={id}
      aria-label={isOutOfStock ? `${name} ناموجود است` : `افزودن ${name} به سبد خرید`}
      disabled={isOutOfStock}
      onClick={() => {
        add(id);
        notyf.success(`${name} با موفقیت به سبد خرید اضافه شد!`);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      }}
    >
      {compact ? "+" : isOutOfStock ? "ناموجود" : "افزودن به سبد خرید"}
    </button>
  );
}
