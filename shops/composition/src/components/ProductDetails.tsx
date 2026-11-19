import type { CardView } from "../shared/types";
import { useCartStore } from "../hooks/useCartStore";
import ProductImage from "./ProductImage";

export default function ProductDetails({ card }: { card: CardView }) {
  const add = useCartStore(state => state.add);
  return <article className="product-card product-details">
    <ProductImage emoji={card.emoji} />
    <div className="product-details-info">
      <h1>{card.name}</h1>
      <p className="unit">{card.unit}</p>
      {card.badge && <span className="discount-badge">{card.badge}</span>}
      <div className="price">
        {card.oldPrice && <del>{card.oldPrice}</del>}
        <strong>{card.price}</strong>
      </div>
      {!card.available && <p role="status">این محصول فعلاً ناموجود است.</p>}
      <button type="button" disabled={!card.available}
        aria-label={"افزودن " + card.name + " به سبد"} onClick={() => add(card.item, card.stock)}>
        {card.available ? "افزودن به سبد" : "ناموجود"}
      </button>
    </div>
  </article>;
}
