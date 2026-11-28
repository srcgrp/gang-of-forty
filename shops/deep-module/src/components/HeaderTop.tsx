import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Product, Shop } from "../types";
import { useSearch } from "../hooks/useSearch";
import { useUiStore } from "../hooks/useUiStore";
import { HeaderLogo } from "./HeaderLogo";
import { SearchBox } from "./SearchBox";
import { HeaderActions } from "./HeaderActions";

interface HeaderTopProps {
  shop: Shop;
  products: Product[];
  isHidden?: boolean;
}

export function HeaderTop({ shop, products, isHidden = false }: HeaderTopProps) {
  const [query, setQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const suggestions = useSearch(products, query);
  const navigate = useNavigate();
  const drawerOpen = useUiStore((s) => s.drawerOpen);
  const setDrawerOpen = useUiStore((s) => s.setDrawerOpen);

  useEffect(() => {
    if (!isHidden) setSearchExpanded(false);
  }, [isHidden]);

  const searchCollapsed = isHidden && !searchExpanded;
  const openSearch = () => {
    setSearchExpanded(true);
    requestAnimationFrame(() => document.getElementById("site-search")?.focus());
  };
  const handlePickProduct = (p: Product) => {
    setQuery("");
    void navigate({ to: "/product/$productId", params: { productId: String(p.id) } });
  };

  return (
    <div className={`header-top${searchCollapsed ? " header-top--search-hidden" : ""}`}>
      <div className="header-top__brand">
        <button
          type="button"
          className={`mobile-header-menu-btn${drawerOpen ? " is-open" : ""}`}
          aria-label="باز کردن منو"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <span className="hamburger-lines" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <HeaderLogo name={shop.name} slogan={shop.slogan} />
      </div>
      <div className={`header-top__search${searchCollapsed ? " header-top__search--hidden" : ""}`}>
        <SearchBox query={query} onQuery={setQuery} suggestions={suggestions} onPickProduct={handlePickProduct} />
      </div>
      <div className="header-top__actions">
        <button type="button" className="header-action-btn mobile-header-search-btn" aria-label="باز کردن جستجو" onClick={openSearch}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </button>
        <HeaderActions />
      </div>
    </div>
  );
}
