import { Outlet } from "@tanstack/react-router";
import { useThemeStore } from "../hooks/useThemeStore";
import { useCatalog } from "../hooks/useCatalog";
import { useUiStore } from "../hooks/useUiStore";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CartModal } from "./CartModal";
import { WishlistPanel } from "./WishlistPanel";
import { UserModal } from "./UserModal";
import { SliderEnhancer } from "./SliderEnhancer";
import { SkeletonCard } from "./SkeletonCard";
import { MobileBottomNav } from "./MobileBottomNav";

const SKELETON_SLOTS = [1, 2, 3, 4];

export function Layout() {
  const theme = useThemeStore((s) => s.theme);
  const { state, retry } = useCatalog();
  const userOpen = useUiStore((s) => s.userOpen);
  const setUserOpen = useUiStore((s) => s.setUserOpen);

  if (state.status === "loading") {
    return (
      <div className="app" data-theme={theme}>
        <div className="skeleton-page" role="status" aria-busy="true" aria-label="در حال بارگذاری محصولات...">
          <div className="skeleton skeleton-header" />
          <div className="skeleton skeleton-hero" />
          <div className="products-grid skeleton-grid">
            {SKELETON_SLOTS.map((n) => <SkeletonCard key={n} />)}
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="app" data-theme={theme}>
        <div className="state-error" role="alert">
          <span className="state-error__icon" aria-hidden="true">⚠️</span>
          <h2 className="state-error__title">خطا در بارگذاری</h2>
          <p className="state-error__text">{state.message}</p>
          <div className="state-error__actions">
            <button type="button" className="btn-retry" onClick={retry}>تلاش مجدد</button>
          </div>
        </div>
      </div>
    );
  }

  const { shop, categories, products, home, stock } = state.data;

  return (
    <div className="app" data-theme={theme}>
      <SliderEnhancer />
      <SiteHeader shop={shop} categories={categories} products={products} carousels={home.carousels ?? []} />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <SiteFooter shop={shop} categories={categories} />
      <MobileBottomNav />
      <CartModal stock={stock} />
      <WishlistPanel products={products} />
      <UserModal isOpen={userOpen} onClose={() => setUserOpen(false)} />
    </div>
  );
}
