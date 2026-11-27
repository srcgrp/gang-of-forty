import { Link } from "@tanstack/react-router";
import type { Category, HomeCarousel, Shop } from "../types";
import { useUiStore } from "../hooks/useUiStore";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

interface MainNavProps {
  shop: Shop;
  categories: Category[];
  carousels: HomeCarousel[];
  isHidden?: boolean;
}

const activeLink = { className: "nav-link--active" };

export function MainNav({ shop, categories, carousels, isHidden = false }: MainNavProps) {
  const drawerOpen = useUiStore((s) => s.drawerOpen);
  const setDrawerOpen = useUiStore((s) => s.setDrawerOpen);
  const offers = carousels.find((c) => c.id === "offers");

  return (
    <>
      <div className={isHidden ? "main-nav-wrapper nav--hidden" : "main-nav-wrapper"}>
        <nav className="main-nav" aria-label="منوی اصلی">
          <div className="nav__wrapper nav-scroll-wrap">
            <button type="button" className="mobile-drawer-trigger" aria-label="باز کردن منو" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
              <span>دسته‌ها</span>
            </button>
            <MegaMenu categories={categories} />
            <ul className="nav__links nav__links--scroll">
              <li>
                <Link to="/" activeProps={activeLink} activeOptions={{ exact: true }}>خانه</Link>
              </li>
              {offers && (
                <li>
                  <Link to="/plp/$carouselId" params={{ carouselId: offers.id }} search={{ sort: "default" }} activeProps={activeLink} activeOptions={{ includeSearch: false }}>
                    🔥 {offers.title}
                  </Link>
                </li>
              )}
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to="/plp/$carouselId" params={{ carouselId: cat.slug || String(cat.id) }} search={{ sort: "default" }} activeProps={activeLink} activeOptions={{ includeSearch: false }}>
                    <span aria-hidden="true">{cat.emoji || "📦"}</span> {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/checkout" activeProps={activeLink}>تسویه حساب</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <MobileMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} shop={shop} categories={categories} offers={offers} />
    </>
  );
}
