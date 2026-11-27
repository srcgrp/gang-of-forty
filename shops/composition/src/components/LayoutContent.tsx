import { useCallback, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useCatalog } from "../hooks/useCatalog";
import { HomeFiltersContext } from "../hooks/useHomeFilters";
import { createResults } from "../features/products/catalog/results";
import { normalizeSearch } from "../features/products/catalog/search";
import Header from "./Header";
import Footer from "./Footer";
import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";

export default function LayoutContent() {
  const state = useCatalog();
  const navigate = useNavigate();
  const pathname = useLocation({ select: location => location.pathname });
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const onPick = useCallback((id: number | null): void => {
    setCategoryId(id);
    setQuery("");
    void navigate({ to: "/" });
  }, [navigate]);
  function onQuery(value: string): void {
    setQuery(value);
    if (pathname !== "/") void navigate({ to: "/" });
  }
  const filters = useMemo(() => ({ query, categoryId, onPick }), [query, categoryId, onPick]);
  const data = state.status === "success" ? state.data : null;
  const category = data?.categories.find(item => item.id === categoryId);
  const suggestions = data && normalizeSearch(query) ? createResults(data)({
    query, category: category?.slug ?? "", sort: "default",
  }).cards : [];
  return (
    <HomeFiltersContext.Provider value={filters}>
      <div id="top">
        <Link className="skip-link" to="." hash="main">پرش به محتوای اصلی</Link>
        {data ? <Header suggestions={suggestions} query={query} onQuery={onQuery}
          shop={data.shop} categories={data.categories} stock={data.stock} /> :
          <header className="site-header"><div className="header-top wrap"><Brand /><ThemeToggle /></div></header>}
        <Outlet />
        {data && <Footer shop={data.shop} categories={data.categories} />}
      </div>
    </HomeFiltersContext.Provider>
  );
}
