import type { Product } from "../types";
import { formatPrice } from "../shared/ui/format";
import { useAutoAnimate } from "../hooks/useAutoAnimate";

interface Props {
  suggestions: Product[];
  onPick: (p: Product) => void;
}

export function SearchSuggestions({ suggestions, onPick }: Props) {
  const listRef = useAutoAnimate<HTMLDivElement>();

  return (
    <div
      ref={listRef}
      id="search-suggestions"
      className="search__suggestions search__suggestions--visible"
      role="listbox"
      aria-label="پیشنهادهای جستجو"
    >
      {suggestions.length === 0 ? (
        <div className="search-suggestion--empty">نتیجه‌ای یافت نشد</div>
      ) : (
        suggestions.map((p) => (
          <button
            key={p.id}
            type="button"
            className="search-suggestion"
            onClick={() => onPick(p)}
          >
            <span className="search-suggestion__emoji">{p.emoji || "📦"}</span>
            <div className="search-suggestion__info">
              <span className="search-suggestion__name">{p.name}</span>
              <span className="search-suggestion__unit">{p.unit || ""}</span>
            </div>
            <span className="search-suggestion__price">{formatPrice(p.price)}</span>
          </button>
        ))
      )}
    </div>
  );
}
