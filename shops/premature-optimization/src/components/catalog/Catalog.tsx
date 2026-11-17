import { useEffect, useRef, useState } from "react";
import type { CatalogData } from "../../scripts/types";
import { filterProducts } from "../../scripts/logic/catalog/filter-products";
import {
  categorySections,
  specialOffers,
} from "../../scripts/logic/catalog/sections";
import { revealSections } from "../../lib/animations/animation";
import CategoryNav from "../home/CategoryNav";
import Hero from "../home/Hero";
import ProductGrid from "./ProductGrid";
import Promos from "../home/Promo";
import { SearchResults } from "../shared/Search";
import SaleBanner from "../home/SaleBanner";

type CatalogProps = { data: CatalogData; query: string };

export default function Catalog({ data, query }: CatalogProps) {
  const { products, offers, categories, home, stock } = data;
  const main = useRef<HTMLElement>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const shared = { offers, stock, categories };
  const special = specialOffers(products, offers);
  const sections = categorySections(products, categories);

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
          <SaleBanner />
          <CategoryNav
            categories={categories}
            activeId={categoryId}
            onPick={setCategoryId}
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
