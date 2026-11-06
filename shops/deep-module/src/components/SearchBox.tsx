import { useState, useRef, useEffect } from "react";
import type { Product } from "../types";
import { formatPrice } from "../shared/ui/format";

interface SearchBoxProps {
  query: string;
  onQuery: (q: string) => void;
  suggestions?: Product[];
  onPickProduct?: (p: Product) => void;
}

export function SearchBox({
  query,
  onQuery,
  suggestions = [],
  onPickProduct,
}: SearchBoxProps) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const showList = open && query.trim().length > 0;

  return (
    <form
      ref={boxRef}
      className="search"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="site-search" className="visually-hidden">
        جستجو در محصولات
      </label>
      <span className="search__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </span>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => {
          onQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="جستجو در میان ۳۰۰۰ کالا..."
        autoComplete="off"
        aria-expanded={showList}
        aria-controls="search-suggestions"
      />
      {query && (
        <button
          type="button"
          className="search__clear"
          aria-label="پاک کردن"
          onClick={() => {
            onQuery("");
            setOpen(false);
          }}
        >
          ✕
        </button>
      )}
      <button type="submit" className="search__submit">
        جستجو
      </button>

      {showList && (
        <div
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
                onClick={() => {
                  onPickProduct?.(p);
                  setOpen(false);
                }}
              >
                <span className="search-suggestion__emoji">
                  {p.emoji || "📦"}
                </span>
                <div className="search-suggestion__info">
                  <span className="search-suggestion__name">{p.name}</span>
                  <span className="search-suggestion__unit">
                    {p.unit || ""}
                  </span>
                </div>
                <span className="search-suggestion__price">
                  {formatPrice(p.price)}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </form>
  );
}
