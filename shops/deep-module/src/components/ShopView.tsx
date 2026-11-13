import type { AppData } from "../types";
import { useShop } from "../hooks/useShop";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ShopMain } from "./ShopMain";
import { CartModal } from "./CartModal";
import { WishlistPanel } from "./WishlistPanel";
import { FilterModal } from "./FilterModal";
import { UserModal } from "./UserModal";

export function ShopView({ data }: { data: AppData }) {
  const shop = useShop(data);
  const { shop: shopInfo, categories, products } = data;

  const handlePickSuggestion = (p: { name: string }) => {
    shop.setQuery(p.name);
    document
      .getElementById("all-products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SiteHeader
        shop={shopInfo}
        categories={categories}
        cartCount={shop.cart.cart.length}
        wishlistCount={shop.wishlist.ids.length}
        onOpenWishlist={() => shop.setWishlistOpen(true)}
        onOpenUser={() => shop.setUserOpen(true)}
        query={shop.query}
        onQuery={shop.setQuery}
        suggestions={shop.suggestions}
        onPickProduct={handlePickSuggestion}
        onOpenCart={() => shop.setCartOpen(true)}
      />
      <ShopMain data={data} shop={shop} />
      <SiteFooter shop={shopInfo} categories={categories} />
      <CartModal
        isOpen={shop.cartOpen}
        cart={shop.cart.cart}
        stock={shop.effectiveStock}
        onClose={() => shop.setCartOpen(false)}
        onIncrease={shop.handleIncrease}
        onDecrease={shop.cart.decrease}
        onRemove={shop.cart.removeItem}
        onCheckout={shop.handleCheckout}
      />
      <WishlistPanel
        isOpen={shop.wishlistOpen}
        products={products}
        wishlistIds={shop.wishlist.ids}
        cart={shop.cart.cart}
        onRemove={shop.wishlist.remove}
        onAdd={shop.handleAddToCart}
        onClose={() => shop.setWishlistOpen(false)}
        onClear={shop.wishlist.clear}
      />
      <FilterModal
        isOpen={shop.filterOpen}
        onClose={() => shop.setFilterOpen(false)}
        categories={categories}
        filters={shop.filters}
        onChange={shop.update}
        onReset={shop.reset}
      />
      <UserModal
        isOpen={shop.userOpen}
        onClose={() => shop.setUserOpen(false)}
      />
    </>
  );
}
