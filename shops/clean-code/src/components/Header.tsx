import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cartCount as countLines } from "../features/cart/count";
import { useCartLines } from "../hooks/useCart";
import { useCatalog } from "../hooks/useCatalog";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const lines = useCartLines();
  const cartCount = countLines(lines);
  const { load } = useCatalog();
  const [query, setQuery] = useState("");
  const menu = load.status === "success" ? load.shop.menu : [];

  useEffect(
    function () {
      document.title =
        "تمیز مارکت · " + cartCount.toLocaleString("fa-IR") + " 🛒";
    },
    [cartCount],
  );

  return (
    <header className="header">
      <div className="box header-top">
        <div className="brand">
          <a href="#/">
            <Logo />
          </a>
          <div>
            <h1>سوپرمارکت تمیز</h1>
            <p className="slogan">تازه، نزدیک، به‌صرفه</p>
          </div>
        </div>
        <SearchBox query={query} onQuery={setQuery} />
        <a className="cart" href="#cart">
          <span className="cart-label">سبد خرید</span>
          <CartIcon />
          <span className="cart-count">
            {cartCount.toLocaleString("fa-IR")}
          </span>
        </a>
        <Link className="checkout-link" to="/checkout">
          تکمیل سفارش
        </Link>
        <ThemeToggle />
        <MenuToggle />
      </div>
      <nav className="main-nav" id="menu" aria-label="منوی اصلی">
        <ul className="box" id="menu-list">
          {menu.map(function (item) {
            return (
              <li key={item.href + item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
