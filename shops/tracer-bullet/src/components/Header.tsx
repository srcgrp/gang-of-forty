import Logo from "./Logo.tsx";
import { formatNumber } from "../format/formatting.ts";
import searchIcon from "../../png/magnifying-glass-fill.png";
import cartIcon from "../../png/shopping-bag-open-fill.png";
import type { Category, Shop } from "../types.ts";
import MainNav from "./MainNav.tsx";
import ThemeToggle from "./ThemeToggle.tsx";
import { cartCount } from "../cart/cart-lines.ts";
import { useCartStore } from "../hooks/useCartStore.ts";
import { Link } from "@tanstack/react-router";

type HeaderProps = {
  shop: Shop;
  categories: Category[];
};

export default function Header({ shop, categories }: HeaderProps) {
  const count = useCartStore((s) => cartCount(s.lines));
  return (
    <header id="top">
      <p className="notice">{shop.notice}</p>
      <h1 className="logo">
        <Link to="/">
          <Logo />
          <span className="logo-text">
            <span>پرتقال</span>
            <small className="slogan">{shop.slogan}</small>
          </span>
        </Link>
      </h1>
      <form className="search" role="search" action="#">
        <label htmlFor="search" className="visually-hidden">
          جستجو
        </label>
        <input type="search" id="search" name="q" placeholder="جستجو" />
        <button type="submit" aria-label="جستجو">
          <img src={searchIcon} alt="" width="20" height="20" />
        </button>
      </form>
      <button type="button" className="cart">
        <img
          className="icon-inline"
          src={cartIcon}
          alt=""
          width="20"
          height="20"
        />
        سبد خرید
        <span className="cartCount" aria-hidden="true">
          {formatNumber(count)}
        </span>
        <span className="visually-hidden cartCountText">
          {formatNumber(count)} کالا در سبد
        </span>
      </button>
      <ThemeToggle />
      <input type="checkbox" id="menu-toggle" className="visually-hidden" />
      <label htmlFor="menu-toggle" className="menu-button">
        <span aria-hidden="true">☰</span>
        <span className="visually-hidden">منو</span>
      </label>
      <MainNav menu={shop.menu} categories={categories} />
    </header>
  );
}
