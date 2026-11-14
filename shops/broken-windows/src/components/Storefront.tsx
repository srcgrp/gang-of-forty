import Header from "./Header.tsx";
import Navigation from "./Navigation.tsx";
import Hero from "./Hero.tsx";
import Benefits from "./Benefits.tsx";
import CategoryNav from "./CategoryNave.tsx";
import ProductGrid from "./ProductGrid.tsx";
import Middle from "./Middle.tsx";
import CartPanel from "./CartPanel.tsx";
import Notification from "./Notification.tsx";
import Footer from "./Footer.tsx";
import type { LoadedState } from "../types.ts";
import { searchProducts } from "../catalog/lookup.ts";
import { useState } from "react";
import { carouselProducts } from "../catalog/carouselProducts.ts"
import { filterByCategory } from "../catalog/filterByCategory.ts";
type Props = {
  data: LoadedState;
};
export default function Storefront({ data }: Props) {
  const { products, offers, stock, categories } = data;
   const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  function handlePick(id: number) {
    setCategoryId((prev) => (prev === id ? null : id));
  }
  const visible = searchProducts(filterByCategory(products, categoryId), query);
const dairy = carouselProducts(data, "dairy") ?? [];  
return (
    <>
      <Header query={query} onQuery={setQuery} />
      <Navigation />
      <main className="site-main">
        <Hero />
        <Benefits />
        <CategoryNav categories={categories} activeId={categoryId} onPick={handlePick} />
        <ProductGrid
          title="پرفروش‌های امروز"
          id="special-offer"
          products={visible}
          offers={offers}
          stock={stock}
        />
        <Middle />
        <ProductGrid
          title="لبنیات و بستنی"
          id="dairy"
          nuts
          products={dairy}
          offers={offers}
          stock={stock}
        />
        <CartPanel />
        <Notification />
      </main>
      <Footer />
    </>
  );
}