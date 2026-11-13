import type { AppData } from "../types";
import type { ShopState } from "../hooks/useShop";
import { Hero } from "./Hero";
import { HeroCards } from "./HeroCards";
import { SaleCountdown } from "./SaleCountdown";
import { CategoriesSection } from "./CategoriesSection";
import { SpecialOffers } from "./SpecialOffers";
import { BannersSection } from "./BannersSection";
import { CategorySections } from "./CategorySections";
import { AllProductsSection } from "./AllProductsSection";

export function ShopMain({ data, shop }: { data: AppData; shop: ShopState }) {
  const { products, categories, home, offers } = data;

  return (
    <main id="main" tabIndex={-1}>
      <Hero home={home} />
      <HeroCards home={home} />
      <SaleCountdown />
      <CategoriesSection categories={categories} />

      <SpecialOffers
        products={products}
        cart={shop.cart.cart}
        offers={offers}
        stock={shop.effectiveStock}
        onAdd={shop.handleAddToCart}
        wishlistIds={shop.wishlist.ids}
        onToggleWishlist={shop.handleToggleWishlist}
      />

      <BannersSection home={home} />

    
      <CategorySections
        products={products}
        categories={categories}
        cart={shop.cart.cart}
        offers={offers}
        stock={shop.effectiveStock}
        onAdd={shop.handleAddToCart}
        wishlistIds={shop.wishlist.ids}
        onToggleWishlist={shop.handleToggleWishlist}
      />

      <AllProductsSection
        filtered={shop.filtered}
        cart={shop.cart.cart}
        offers={offers}
        stock={shop.effectiveStock}
        filters={shop.filters}
        onUpdate={shop.update}
        hasRealFilters={shop.hasRealFilters}
        realActiveCount={shop.realActiveCount}
        onOpenFilter={() => shop.setFilterOpen(true)}
        onAdd={shop.handleAddToCart}
        wishlistIds={shop.wishlist.ids}
        onToggleWishlist={shop.handleToggleWishlist}
      />
    </main>
  );
}
