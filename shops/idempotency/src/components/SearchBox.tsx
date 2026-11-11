import { useState } from "react";
import type { SearchableProduct } from "../shared/types/search";

type Props = {
  value: string;
  onChange: (value: string) => void;
  matches: SearchableProduct[];
};

export default function SearchBox({ value, onChange, matches }: Props) {
  const [open, setOpen] = useState(false);

  function pickProduct(id: number): void {
    setOpen(false);
    const card = document.querySelector<HTMLElement>(
      `.product-card[data-api-product="${id}"]`,
    );
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("product-highlight");
    window.setTimeout(() => card.classList.remove("product-highlight"), 2500);
  }

  return (
    <form
      className="search"
      role="search"
      onSubmit={(event) => event.preventDefault()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <label htmlFor="site-search">جستجو در تازه‌خانه</label>
      <div className="search-box">
        <input
          id="site-search"
          type="search"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="جستجوی محصولات..."
        />
      </div>
      {open && value.trim() && (
        <div id="search-result" className="search-results">
          {matches.length === 0 ? (
            <p className="search-result-item">محصولی پیدا نشد.</p>
          ) : (
            matches.map((item) => (
              <button
                key={item.id}
                type="button"
                className="search-result-item"
                onClick={() => pickProduct(item.id)}
              >
                {item.name}
              </button>
            ))
          )}
        </div>
      )}
    </form>
  );
}
