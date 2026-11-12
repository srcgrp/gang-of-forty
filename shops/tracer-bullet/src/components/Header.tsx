import Logo from "./Logo.tsx";
import { formatNumber } from "../format/formatting.ts";
import searchIcon from "../../png/magnifying-glass-fill.png";
import cartIcon from "../../png/shopping-bag-open-fill.png";

type HeaderProps = {
  count: number;
};

export default function Header({ count }: HeaderProps) {
  return (
    <header id="top">
      <p className="notice"></p>
      <h1 className="logo">
        <a href="#top">
          <Logo />
          <span className="logo-text">
            <span>پرتقال</span>
            <small className="slogan"></small>
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
      <nav className="main-nav" aria-label="منوی اصلی">
        <ul>
          <li className="dropdown">
            <button type="button">همه دسته‌ها</button>
            <ul className="dropdown-menu"></ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
