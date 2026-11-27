import { useState, useMemo } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import { useCartStore } from "../../hooks/useCartStore";
import { useFilters, applyFilters } from "../../hooks/useFilters";
import { getEffectiveStock } from "../../catalog/stock";
import { Hero } from "../Hero";
import { HeroCards } from "../HeroCards";
import { SaleCountdown } from "../SaleCountdown";
import { CategoriesSection } from "../CategoriesSection";
import { SpecialOffers } from "../SpecialOffers";
import { BannersSection } from "../BannersSection";
import { CategorySections } from "../CategorySections";
import { AllProductsSection } from "../AllProductsSection";
import { FilterModal } from "../FilterModal";

export function HomePage() {
  const { state } = useCatalog();
  const consumed = useCartStore((s) => s.consumed);
  const { filters, update, reset } = useFilters();
  const [filterOpen, setFilterOpen] = useState(false);

  const effectiveStock = useMemo(
    () => (state.status === "success" ? getEffectiveStock(state.data.stock, consumed) : { items: {} }),
    [state, consumed],
  );
  const filtered = useMemo(
    () => (state.status === "success" ? applyFilters(state.data.products, filters, state.data.offers, effectiveStock) : []),
    [state, filters, effectiveStock],
  );

  if (state.status !== "success") return null;

  const { products, categories, home, offers } = state.data;
  const offerPreview = products.filter((p) => offers.some((o) => o.productId === p.id)).slice(0, 6);
  const realActiveCount = (filters.categoryId !== null ? 1 : 0) + (filters.stock !== "all" ? 1 : 0) + (filters.discount !== "all" ? 1 : 0);

  return (
    <>
      <Hero home={home} />
      <HeroCards home={home} />
      <SaleCountdown />
      <CategoriesSection categories={categories} />
      <SpecialOffers products={offerPreview} offers={offers} stock={effectiveStock} />
      <BannersSection home={home} />
      <CategorySections products={products} categories={categories} offers={offers} stock={effectiveStock} />
      <AllProductsSection
        filtered={filtered}
        offers={offers}
        stock={effectiveStock}
        filters={filters}
        onUpdate={update}
        hasRealFilters={realActiveCount > 0}
        realActiveCount={realActiveCount}
        onOpenFilter={() => setFilterOpen(true)}
      />
      <FilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} categories={categories} filters={filters} onChange={update} onReset={reset} />
    </>
  );
}
