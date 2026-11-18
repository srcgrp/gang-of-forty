import type { ReactNode } from "react";
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
  const add = useCartStore((s) => s.add);
  const soldOut = useIsSoldOut(product.id, stock);

  return (
    <button
      className={className}
      type="button"
      disabled={soldOut}
      title={
        soldOut
          ? "موجودی این محصول تمام شده است"
          : `افزودن ${product.name} به سبد خرید`
      }
      onClick={(e) => {
        add(product.id);
        addedFeedback(e.currentTarget);
      }}
    >
      {children}
    </button>
  );
}
