import { useEffect, useRef, useState } from "react";
import type { CardView } from "../shared/types";
import { normalizeSearch } from "../features/products/catalog/search";
import closeIcon from "../../icons/x.svg";
import SearchSuggestions from "./SearchSuggestions";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; query: string; onQuery: (query: string) => void; cards: CardView[] };
export default function SearchBox({ open, onOpenChange: setOpen, query, onQuery, cards }: Props) {
  const [active, setActive] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const visible = open && normalizeSearch(query) !== "";
  const suggestions = cards.slice(0, 5);
  const selected = active >= 0 && active < suggestions.length ? active : -1;
  useEffect(() => {
    const dismiss = (event: PointerEvent): void => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [setOpen]);
  function navigate(index: number): void {
    const card = suggestions[index];
    const position = card ? cards.findIndex(item => item.id === card.id) : -1;
    const id = position < 0 ? "search-results" : "search" + (position === 0 ? "-first" :
      position === cards.length - 1 ? "-last" : "-" + card?.id);
    const target = document.getElementById(id);
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
    setOpen(false);
    setActive(-1);
  }
  return (
    <div className="search-box" ref={container}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <label htmlFor="product-search">جست‌وجوی محصولات</label>
      <div className="search-input-wrap">
      <input ref={input} id="product-search" type="search" role="combobox" value={query}
        aria-expanded={visible} aria-controls={visible ? "search-suggestions" : undefined} aria-autocomplete="list"
        aria-activedescendant={visible && selected >= 0 ? "suggestion-" + selected : undefined}
        onClick={() => setOpen(true)} onFocus={() => setOpen(true)} onChange={event => { onQuery(event.target.value); setOpen(true); setActive(-1); }}
        onKeyDown={event => {
          if (event.key === "Escape") { event.preventDefault(); setOpen(false); setActive(-1); }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); setOpen(true);
            setActive(previous => {
              if (!suggestions.length) return -1;
              if (!visible || previous < 0) return event.key === "ArrowDown" ? 0 : suggestions.length - 1;
              return (previous + (event.key === "ArrowDown" ? 1 : -1) + suggestions.length) % suggestions.length;
            });
          }
          if (event.key === "Enter" && normalizeSearch(query)) { event.preventDefault(); navigate(visible ? selected : -1); }
        }} placeholder="دنبال چی می‌گردی؟" />
      {query !== "" && <button type="button" className="search-clear" aria-label="پاک کردن جست‌وجو"
        onClick={() => { onQuery(""); setActive(-1); input.current?.focus(); setOpen(false); }}>
        <img src={closeIcon} alt="" width="20" height="20" />
      </button>}
      </div>
      {visible && <SearchSuggestions cards={suggestions} active={selected} onSelect={navigate} />}
    </div>
  );
}
