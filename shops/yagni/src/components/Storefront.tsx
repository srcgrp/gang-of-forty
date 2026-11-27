import type { Cart, Categories, Home, LoadState, ProductCardData, Shop } from "../types";
import { countCartItems, totalCartPrice } from "../cart/cart-logic";
import Header from "./Header";
import CategoryNav from "./CategoryNav";
import Banner from "./Banner";
import CategoryGrid from "./CategoryGrid";
import CatalogView from "./catalog/CatalogView";
import PromoSections from "./PromoSections";
import SaleCountdownArea from "./SaleCountdownArea";
import StoreSupport from "./StoreSupport";
import StoreFooter from "./StoreFooter";
import CartPanel from "./CartPanel";

interface StorefrontProps {
  cart: Cart; categories: Categories; home: Home | null; shop: Shop | null;
  loadState: LoadState; cards: ProductCardData[]; searchQuery: string;
  selectedCategoryId: number | null; isCartOpen: boolean; isCountdownVisible: boolean;
  onSearch: (query: string) => void; onPickCategory: (id: number | null) => void;
  onAdd: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onRetry: () => void; onOpenCart: () => void; onCloseCart: () => void;
  onToggleCountdown: () => void;
}

export default function Storefront(props: StorefrontProps) {
  const { cart, categories, home, shop, loadState, cards, searchQuery,
    selectedCategoryId, isCartOpen, isCountdownVisible } = props;
  return (
    <>
      <Header cartCount={countCartItems(cart)} totalPrice={totalCartPrice(cart)}
        searchQuery={searchQuery} onSearch={props.onSearch} onOpenCart={props.onOpenCart} />
      <CategoryNav categories={categories} selectedCategoryId={selectedCategoryId}
        onPick={props.onPickCategory} />
      {home && <Banner slides={[home.hero, home.side]} />}
      <SaleCountdownArea isVisible={isCountdownVisible} onToggle={props.onToggleCountdown} />
      <main>
        {categories.length > 0 && <CategoryGrid categories={categories} />}
        <CatalogView state={loadState} categories={categories} cards={cards}
          onAdd={props.onAdd} onRetry={props.onRetry} />
        {home && <PromoSections promos={home.promos} />}
      </main>
      <StoreSupport />
      {shop && <StoreFooter shop={shop} categories={categories} />}
      <CartPanel isOpen={isCartOpen} onClose={props.onCloseCart} items={cart}
        onUpdateQuantity={props.onUpdateQuantity} onRemove={props.onRemove} />
    </>
  );
}
