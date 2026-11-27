import { useSyncExternalStore } from "react";
import { configuredCategoryCarousel } from "../catalog/carousel-products";
import type { Catalog, ProductLoadState } from "../types";
import CategoryShelves from "./CategoryShelves";
import HomeCarousels from "./HomeCarousels";
import LatestProducts from "./LatestProducts";
import PromoBanners from "./PromoBanners";

type ProductCollectionsProps = {
  catalog: Catalog | null;
  state: ProductLoadState;
  categoryId: number | null;
  onRetry: () => void;
};

const mobilePromoQuery = "(max-width: 680px)";

function subscribeToMobilePromos(onChange: () => void) {
  const media = window.matchMedia(mobilePromoQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isMobilePromoLayout() {
  return window.matchMedia(mobilePromoQuery).matches;
}

export default function ProductCollections(props: ProductCollectionsProps) {
  const mobilePromos = useSyncExternalStore(subscribeToMobilePromos, isMobilePromoLayout);

  if (props.state.status === "error") {
    return (
      <div className="error-state" role="alert">
        <p>خطا در بارگذاری اطلاعات: {props.state.message}</p>
        <button className="buynow-btn" type="button" onClick={props.onRetry}>
          تلاش دوباره
        </button>
      </div>
    );
  }

  const catalog = props.catalog;
  const carousels = catalog?.home.carousels ?? [];
  const offerCarousels = carousels.filter(({ source }) => source === "offers");
  const otherCarousels = carousels.filter(({ source }) => source !== "offers");
  const categories = catalog?.categories.filter(({ id }) => !configuredCategoryCarousel(catalog, id)) ?? [];
  const sectionCount = categories.length + otherCarousels.length;
  // Leave the final two product sections below the desktop promo group.
  const desktopPromoIndex = Math.max(-1, sectionCount - 3);

  const bakery = catalog?.categories.find(({ slug }) => slug === "bakery");
  const bakeryShelfIndex = categories.findIndex(({ slug }) => slug === "bakery");
  const bakeryCarouselIndex = otherCarousels.findIndex(({ categoryId, id }) => (
    id === "bakery" || (bakery && categoryId === bakery.id)
  ));
  const bakeryIndex = bakeryCarouselIndex >= 0 && bakeryShelfIndex < 0
    ? categories.length + bakeryCarouselIndex
    : bakeryShelfIndex;

  const promos = catalog?.home.promos ?? [];
  const bakeryPromos = promos.filter(({ href }) => href === "#bakery");
  const otherPromos = promos.filter(({ href }) => href !== "#bakery");
  const splitPromos = mobilePromos && bakeryIndex >= 0 && bakeryIndex < sectionCount - 1
    && bakeryPromos.length > 0 && otherPromos.length > 0;
  const secondPromoIndex = Math.min(bakeryIndex + 3, sectionCount - 1);

  function renderPromosAfter(sectionIndex: number) {
    if (!splitPromos) {
      return sectionIndex === desktopPromoIndex ? <PromoBanners promos={promos} id="promos" /> : null;
    }
    if (sectionIndex === bakeryIndex) return <PromoBanners promos={bakeryPromos} id="promos" />;
    return sectionIndex === secondPromoIndex ? <PromoBanners promos={otherPromos} /> : null;
  }

  return (
    <>
      <HomeCarousels
        catalog={catalog}
        carousels={offerCarousels}
        state={props.state}
        id="carousels"
      />
      <LatestProducts
        state={props.state}
        categoryId={props.categoryId}
      />
      {renderPromosAfter(-1)}
      <CategoryShelves
        catalog={catalog}
        categories={categories}
        state={props.state}
        afterSection={renderPromosAfter}
      />
      <HomeCarousels
        catalog={catalog}
        carousels={otherCarousels}
        state={props.state}
        afterSection={(index) => renderPromosAfter(categories.length + index)}
      />
    </>
  );
}
