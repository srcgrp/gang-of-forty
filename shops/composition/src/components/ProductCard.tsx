import type { CardView } from "../shared/types";
import ProductImage from "./ProductImage";

type Props = { card: CardView; id: string; onAdd: (id: number) => void };
export default function ProductCard({ card, id, onAdd }: Props) {
  return (
    <article id={id} className={"product-card" + (card.available ? "" : " is-unavailable")}>
      <ProductImage emoji={card.emoji} />
      {!card.available && <span className="stock-badge">ناموجود</span>}
      <h3>{card.name}</h3><p className="unit">{card.unit}</p>
      {card.badge && <span className="discount-badge">{card.badge}</span>}
      <div className="price">
        {card.oldPrice && <del>{card.oldPrice}</del>}
        <strong>{card.price}</strong>
      </div>
      <button type="button" aria-label={"افزودن " + card.name + " به سبد"} onClick={() => onAdd(card.id)} disabled={!card.available}>
        {card.available ? "افزودن به سبد" : "ناموجود"}
      </button>
    </article>
  );
}
