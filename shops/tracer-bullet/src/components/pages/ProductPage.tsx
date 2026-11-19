
import { Link, useParams } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { findCard } from "../../catalog/product-catalog.ts";
import { formatPrice } from "../../format/formatting.ts";
import Status from "../Status.tsx";

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const state = useCatalog();
  const add = useCartStore((s) => s.add);

  if (state.status !== "success") {
    return <Status state={state} />;
  }

const card = findCard(state.data, Number(productId));

if (card === null) {
  return (
    <section>
      <p>محصول پیدا نشد</p>
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </section>
  );
}

  return (
    <section>
      <Link to="/">بازگشت به صفحه اصلی</Link>
      <h2>{card.name}</h2>
      <p className="emoji" aria-hidden="true">{card.emoji}</p>
      <p>واحد: {card.unit}</p>
      <p>قیمت: {formatPrice(card.newPrice ?? card.price)}</p>
      <button
        type="button"
        disabled={card.stock === 0}
        onClick={() => add(card)}
      >
        {card.stock === 0 ? "ناموجود" : "افزودن به سبد"}
      </button>
    </section>
  );
}
