import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import type { Category, HomeCarousel, Shop } from "../types";
import { useThemeStore } from "../hooks/useThemeStore";
import { useUiStore } from "../hooks/useUiStore";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  shop: Shop;
  categories: Category[];
  offers: HomeCarousel | undefined;
}

const activeLink = { className: "mobile-menu__link--active" };

export function MobileMenu({ open, onClose, shop, categories, offers }: MobileMenuProps) {
  const theme = useThemeStore((s) => s.theme);
  const setUserOpen = useUiStore((s) => s.setUserOpen);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const tab = open ? 0 : -1;
  const openProfile = () => { onClose(); setUserOpen(true); };

  return createPortal(
    <>
      <div className={`mobile-menu-backdrop${open ? " mobile-menu-backdrop--open" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`mobile-menu${open ? " mobile-menu--open" : ""}`} data-theme={theme} role="dialog" aria-modal={open} aria-hidden={!open} aria-label="منوی موبایل">
        <div className="mobile-menu__head">
          <div className="mobile-menu__brand"><Logo size={32} /><strong>{shop.name || "سبزکاله"}</strong></div>
          <button type="button" className="mobile-menu__close" aria-label="بستن منو" tabIndex={tab} onClick={onClose}>✕</button>
        </div>
        <div className="mobile-menu__quick">
          <button type="button" className="mobile-menu__quick-btn" tabIndex={tab} onClick={openProfile}><span>👤</span> پروفایل من</button>
          <div className="mobile-menu__theme"><span>تغییر تم</span><ThemeToggle /></div>
        </div>
        <ul className="mobile-menu__list">
          <li><Link to="/" onClick={onClose} tabIndex={tab} activeProps={activeLink} activeOptions={{ exact: true }}>🏠 خانه</Link></li>
          {offers && <li><Link to="/plp/$carouselId" params={{ carouselId: offers.id }} search={{ sort: "default" }} onClick={onClose} tabIndex={tab} activeProps={activeLink}>🔥 {offers.title}</Link></li>}
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link to="/plp/$carouselId" params={{ carouselId: cat.slug || String(cat.id) }} search={{ sort: "default" }} onClick={onClose} tabIndex={tab} activeProps={activeLink}>
                <span>{cat.emoji || "📦"}</span> {cat.name}
              </Link>
            </li>
          ))}
          <li><Link to="/checkout" onClick={onClose} tabIndex={tab} activeProps={activeLink}>🧾 تسویه حساب</Link></li>
        </ul>
      </aside>
    </>,
    document.body,
  );
}
