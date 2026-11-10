import { useEffect, useRef } from "react";
import type { CatalogData, Stock } from "../../scripts/types";
import { filterProducts } from "../../scripts/logic/catalog/filter-products.ts";
import {
  categorySections,
  specialOffers,
} from "../../scripts/logic/catalog/sections.ts";
import { revealSections } from "../../lib/animations/animation.ts";
import CategoryNav from "../home/CategoryNav.tsx";
import Hero from "../home/Hero.tsx";
import ProductGrid from "./ProductGrid.tsx";
import Promos from "../home/Promo.tsx";
import { SearchResults } from "../shared/Search.tsx";

type CatalogProps = {
  data: CatalogData;
  stock: Stock;
  categoryId: number | null;
  query: string;
  onAdd: (id: number, button: HTMLButtonElement) => void;
  onPick: (id: number) => void;
};

export default function Catalog({
  data,
  stock,
  categoryId,
  query,
  onAdd,
  onPick,
}: CatalogProps) {
  const { products, offers, categories, home } = data;
  const main = useRef<HTMLElement>(null);
  const shared = { offers, stock, categories, onAdd };
  const special = specialOffers(products, offers);
  const sections = categorySections(products, categories, categoryId);

  useEffect(
    () => (main.current ? revealSections(main.current) : undefined),
    [],
  );

  return (
    <main id="main-content" ref={main}>
      {query.trim() !== "" ? (
        <SearchResults
          query={query}
          products={filterProducts(products, query)}
          {...shared}
        />
      ) : (
        <>
          <Hero hero={home.hero} side={home.side} />
          <CategoryNav
            categories={categories}
            activeId={categoryId}
            onPick={onPick}
          />
          {special.length > 0 && (
            <ProductGrid
              id="offers"
              title="پیشنهاد ویژه"
              products={special}
              {...shared}
            />
          )}
          <Promos promos={home.promos ?? []} />
          {sections.length === 0 && <p>محصولی در این دسته وجود ندارد.</p>}
          {sections.map(({ category, items }) => (
            <ProductGrid
              key={category.id}
              id={category.slug}
              title={category.name}
              products={items}
              {...shared}
            />
          ))}
        </>
      )}
    </main>
  );
}
