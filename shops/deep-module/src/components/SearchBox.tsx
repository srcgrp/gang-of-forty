import { useState, useRef, useEffect } from "react";
import type { Product } from "../types";
import { SearchSuggestions } from "./SearchSuggestions";

interface SearchBoxProps {
  query: string;
  onQuery: (q: string) => void;
  suggestions?: Product[];
  onPickProduct?: (p: Product) => void;
}

export function SearchBox({ query, onQuery, suggestions = [], onPickProduct }: SearchBoxProps) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const showList = open && query.trim().length > 0;
  const pick = (p: Product) => { onPickProduct?.(p); setOpen(false); };
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); if (suggestions[0]) pick(suggestions[0]); };

  return (
    <form ref={boxRef} className="search search-bar search-box-modern" role="search" onSubmit={onSubmit}>
      <label htmlFor="site-search" className="visually-hidden">جستجو در محصولات</label>
      <span className="search__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false"><path d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>
      </span>
      <input
        id="site-search"
        type="search"
        role="combobox"
        aria-autocomplete="list"
        value={query}
        onChange={(e) => { onQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="جستجو در سبزکاله..."
        autoComplete="off"
        aria-expanded={showList}
        aria-controls={showList ? "search-suggestions" : undefined}
      />
      {query && <button type="button" className="search__clear" aria-label="پاک کردن" onClick={() => { onQuery(""); setOpen(false); }}>✕</button>}
      <button type="submit" className="search__submit">جستجو</button>
      {showList && <SearchSuggestions suggestions={suggestions} onPick={pick} />}
    </form>
  );
}
