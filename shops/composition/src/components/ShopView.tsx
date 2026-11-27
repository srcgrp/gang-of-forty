import { memo, useMemo } from "react";
import type { ShopData } from "../shared/types";
import { buildPage } from "../features/products/catalog/sections";
import Hero from "./Hero";
import CategoryNav from "./CategoryNav";
import Promos from "./Promos";
import ProductSections from "./ProductSections";
import SearchResults from "./SearchResults";
import SaleBanner from "./SaleBanner";
import { normalizeSearch } from "../features/products/catalog/search";

type Props = {
  query: string; saleOpen: boolean; onToggleSale: () => void;
  data: ShopData; categoryId: number | null; onPick: (id: number | null) => void;
};
function ShopView({ query, saleOpen, onToggleSale, data, categoryId, onPick }: Props) {
  const page = useMemo(() => buildPage(data), [data]);
  const category = data.categories.find(item => item.id === categoryId);
  return (
    <main id="main" className="wrap" tabIndex={-1}>
      <SaleBanner open={saleOpen} onToggle={onToggleSale} />
      <Hero home={data.home} />
      <CategoryNav categories={data.categories} categoryId={categoryId} onPick={onPick} />
      <Promos promos={data.home.promos} />
      {normalizeSearch(query) ? <SearchResults data={data} query={query}
        category={category?.slug ?? ""} /> :
        <ProductSections page={page} category={category} />}
    </main>
  );
}

export default memo(ShopView);
