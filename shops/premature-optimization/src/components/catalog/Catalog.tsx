import { useEffect, useMemo, useRef } from "react";
import type { CarouselConfig, CatalogData } from "../../scripts/types.ts";
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
  const isSearching = query.trim() !== "";

  const { offerCarousels, otherCarousels } = useMemo(() => {
    const all = homeCarousels(data);
    return {
      offerCarousels: all.filter(isOffersCarousel),
      otherCarousels: all.filter((c) => !isOffersCarousel(c)),
    };
  }, [data]);

  useEffect(
    () => (main.current ? revealSections(main.current) : undefined),
    [],
  );

  const renderCarousel = (carousel: CarouselConfig) => (
    <CarouselSection
      key={carousel.id}
      carousel={carousel}
      products={carouselProducts(data, carousel.id) ?? []}
      {...shared}
    />
  );

  return (
    <main id="main-content" tabIndex={-1} ref={main}>
      {isSearching ? (
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
          {offerCarousels.map(renderCarousel)}
          <Promos promos={home.promos ?? []} />
          {otherCarousels.map(renderCarousel)}
        </>
      )}
    </main>
  );
}
