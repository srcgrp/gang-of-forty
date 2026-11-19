import { Link } from "@tanstack/react-router";
import type { CardView } from "../shared/types";
import { useCartStore } from "../hooks/useCartStore";
import ProductImage from "./ProductImage";

type Props = { card: CardView; id: string };
export default function ProductCard({ card, id }: Props) {
  const add = useCartStore((state) => state.add);
  return (
    <article id={id} className={"product-card product-card-link" + (card.available ? "" : " is-unavailable")}>
      <ProductImage emoji={card.emoji} />
      {!card.available && <span className="stock-badge">ناموجود</span>}
      <h3><Link to="/product/$productId" params={{ productId: String(card.id) }}>{card.name}</Link></h3><p className="unit">{card.unit}</p>
      {card.badge && <span className="discount-badge">{card.badge}</span>}
      <div className="price">
        {card.oldPrice && <del>{card.oldPrice}</del>}
        <strong>{card.price}</strong>
      </div>
      <button type="button" aria-label={"افزودن " + card.name + " به سبد"} onClick={() => add(card.item, card.stock)} disabled={!card.available}>
        {card.available ? "افزودن به سبد" : "ناموجود"}
      </button>
    </article>
  );
}
