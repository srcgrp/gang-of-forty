import type { Categories, Home, LoadState, Shop, Catalog } from "../types";
import CategoryNav from "./CategoryNav";
import Banner from "./Banner";
import CategoryGrid from "./CategoryGrid";
import CatalogView from "./catalog/CatalogView";
import PromoSections from "./PromoSections";
import SaleCountdownArea from "./SaleCountdownArea";
import StoreSupport from "./StoreSupport";
import StoreFooter from "./StoreFooter";

interface StorefrontProps {
  categories: Categories;
  home: Home | null;
  shop: Shop | null;
  loadState: LoadState<Catalog>;
  searchQuery: string;
  selectedCategoryId: number | null;
  isCountdownVisible: boolean;
  onPickCategory: (id: number | null) => void;
  onRetry: () => void;
  onToggleCountdown: () => void;
}

export default function Storefront(props: StorefrontProps) {
  const {
    categories,
    home,
    shop,
    loadState,
    searchQuery,
    selectedCategoryId,
    isCountdownVisible,
  } = props;

  return (
    <>
      <CategoryNav
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onPick={props.onPickCategory}
      />
      {home && <Banner slides={[home.hero, home.side]} />}
      <SaleCountdownArea
        isVisible={isCountdownVisible}
        onToggle={props.onToggleCountdown}
      />
      <main>
        {categories.length > 0 && <CategoryGrid categories={categories} />}
        <CatalogView
          state={loadState}
          searchQuery={searchQuery}
          onRetry={props.onRetry}
        />
        {home && <PromoSections promos={home.promos} />}
      </main>
      <StoreSupport />
      {shop && <StoreFooter shop={shop} categories={categories} />}
    </>
  );
}
