import type { MouseEvent, ReactNode } from "react";
import type { Product } from "../../scripts/types";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { useIsSoldOut } from "../../hooks/useIsSoldOut.ts";
import { addedFeedback } from "../../lib/animations/feedback.ts";

type AddToCartButtonProps = {
  product: Product;
  stock: number;
  className: string;
  children: ReactNode;
};

export default function AddToCartButton({
  product,
  stock,
  className,
  children,
}: AddToCartButtonProps) {
  const add = useCartStore((state) => state.add);
  const soldOut = useIsSoldOut(product.id, stock);

  const title = soldOut
    ? "موجودی این محصول تمام شده است"
    : `افزودن ${product.name} به سبد خرید`;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    add(product.id);
    addedFeedback(event.currentTarget);
  }

  return (
    <button
      className={className}
      type="button"
      disabled={soldOut}
      title={title}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
