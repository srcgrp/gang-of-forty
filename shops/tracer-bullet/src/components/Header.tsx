import Logo from "./Logo.tsx";
import { formatNumber } from "../format/formatting.ts";
import searchIcon from "../../png/magnifying-glass-fill.png";
import cartIcon from "../../png/shopping-bag-open-fill.png";
import type { Category, Shop } from "../types.ts";
import MainNav from "./MainNav.tsx";

type HeaderProps = {
  count: number;
  shop: Shop;
  categories: Category[];
};

export default function Header({ count, shop, categories }: HeaderProps) {
  return (
    <header id="top">
      <p className="notice">{shop.notice}</p>
      <h1 className="logo">
        <a href="#top">
          <Logo />
          <span className="logo-text">
            <span>پرتقال</span>
            <small className="slogan">{shop.slogan}</small>
          </span>
        </a>
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
      <input type="checkbox" id="menu-toggle" className="visually-hidden" />
      <label htmlFor="menu-toggle" className="menu-button">
        <span aria-hidden="true">☰</span>
        <span className="visually-hidden">منو</span>
      </label>
      <MainNav menu={shop.menu} categories={categories} />
    </header>
  );
}
