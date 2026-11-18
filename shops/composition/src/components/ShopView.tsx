import type { ShopData } from "../shared/types";
import { buildPage } from "../features/products/catalog/sections";
import Header from "./Header";
import Hero from "./Hero";
import CategoryNav from "./CategoryNav";
import Promos from "./Promos";
import ProductSections from "./ProductSections";
import Footer from "./Footer";
import SearchResults from "./SearchResults";
import SaleBanner from "./SaleBanner";
import { createResults } from "../features/products/catalog/results";
import { normalizeSearch } from "../features/products/catalog/search";

type Props = {
  query: string; onQuery: (query: string) => void; saleOpen: boolean; onToggleSale: () => void;
  data: ShopData; categoryId: number | null;
  onPick: (id: number | null) => void;
};
export default function ShopView({ query, onQuery, saleOpen, onToggleSale, data, categoryId, onPick }: Props) {
  const page = buildPage(data);
  const category = data.categories.find(item => item.id === categoryId);
  const results = createResults(data)({ query, category: category?.slug ?? "", sort: "default" });
  return (
    <div id="top">
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header suggestions={results.cards} query={query} onQuery={onQuery} shop={data.shop}
        categories={data.categories} stock={data.stock} onPick={onPick} />
      <main id="main" className="wrap" tabIndex={-1}>
        <SaleBanner open={saleOpen} onToggle={onToggleSale} />
        <Hero home={data.home} onNavigate={() => onPick(null)} />
        <CategoryNav categories={data.categories} categoryId={categoryId} onPick={onPick} />
        <Promos promos={data.home.promos} onNavigate={() => onPick(null)} />
        {normalizeSearch(query) ? <SearchResults data={data} query={query}
          category={category?.slug ?? ""} /> :
          <ProductSections page={page} category={category} />}
      </main>
      <Footer shop={data.shop} categories={data.categories} onNavigate={() => onPick(null)} />
    </div>
  );
}
