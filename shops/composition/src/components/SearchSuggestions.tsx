import type { CardView } from "../shared/types";
import ProductImage from "./ProductImage";

type Props = { cards: CardView[]; active: number; onSelect: (index: number) => void };
export default function SearchSuggestions({ cards, active, onSelect }: Props) {
  return (
    <div className="search-dropdown">
      <ul id="search-suggestions" role="listbox" aria-label="پیشنهاد محصولات">
        {cards.map((card, index) => (
          <li key={card.id} id={"suggestion-" + index} role="option" aria-selected={index === active}
            onMouseDown={event => event.preventDefault()} onClick={() => onSelect(index)}>
            <ProductImage emoji={card.emoji} />
            <span><strong>{card.name}</strong><small>{card.available ? card.price : "ناموجود"}</small></span>
          </li>
        ))}
      </ul>
      {cards.length === 0 && <p role="status">محصولی پیدا نشد.</p>}
      <button type="button" className="search-all" onClick={() => onSelect(-1)}>دیدن همهٔ نتایج</button>
    </div>
  );
}
