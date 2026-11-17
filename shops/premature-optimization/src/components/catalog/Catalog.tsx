import { useEffect, useRef } from "react";
import type { CarouselConfig, CatalogData } from "../../scripts/types";
import { useSearchStore } from "../../hooks/useSearchStore.ts";
import { isOffersCarousel } from "../../scripts/logic/carousel/carousel-config.ts";
import { carouselProducts } from "../../scripts/logic/carousel/carousel-products.ts";
import { homeCarousels } from "../../scripts/logic/carousel/home-carousels.ts";
import { filterProducts } from "../../scripts/logic/catalog/filter-products.ts";
import { revealSections } from "../../lib/animations/animation.ts";
import CarouselSection from "../home/CarouselSection.tsx";
import CategoryNav from "../home/CategoryNav.tsx";
import Hero from "../home/Hero.tsx";
import Promos from "../home/Promo.tsx";
import SaleBanner from "../home/SaleBanner.tsx";
import { SearchResults } from "../shared/Search.tsx";

export default function Catalog({ data }: { data: CatalogData }) {
  const query = useSearchStore((s) => s.query);
  const { products, offers, categories, home, stock } = data;
  const main = useRef<HTMLElement>(null);
  const shared = { offers, stock, categories };
  const carousels = homeCarousels(data);

  const renderCarousel = (carousel: CarouselConfig) => (
    <CarouselSection
      key={carousel.id}
      carousel={carousel}
      products={carouselProducts(data, carousel.id) ?? []}
      {...shared}
    />
  );

  useEffect(
    () => (main.current ? revealSections(main.current) : undefined),
    [],
  );

  return (
    <main id="main-content" tabIndex={-1} ref={main}>
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
          <CategoryNav categories={categories} />
          {carousels.filter(isOffersCarousel).map(renderCarousel)}
          <Promos promos={home.promos ?? []} />
          {carousels.filter((c) => !isOffersCarousel(c)).map(renderCarousel)}
        </>
      )}
    </main>
  );
}
