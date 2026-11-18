import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useCatalog } from "../hooks/useCatalog";
import { HomeFiltersContext } from "../hooks/useHomeFilters";
import { createResults } from "../features/products/catalog/results";
import Header from "./Header";
import Footer from "./Footer";
import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";
import CartTitle from "./CartTitle";

export default function LayoutContent() {
  const state = useCatalog();
  const navigate = useNavigate();
  const pathname = useLocation({ select: location => location.pathname });
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  function onPick(id: number | null): void {
    setCategoryId(id);
    setQuery("");
    void navigate({ to: "/" });
  }
  function onQuery(value: string): void {
    setQuery(value);
    if (pathname !== "/") void navigate({ to: "/" });
  }
  const data = state.status === "success" ? state.data : null;
  const category = data?.categories.find(item => item.id === categoryId);
  const suggestions = data ? createResults(data)({
    query, category: category?.slug ?? "", sort: "default",
  }).cards : [];
  return (
    <HomeFiltersContext.Provider value={{ query, categoryId, onPick }}>
      <div id="top">
        <CartTitle />
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
