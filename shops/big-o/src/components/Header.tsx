import Announcement from "./Announcement";
import cartIcon from "../../assets/icons/cart.svg";
import CategoryNav from "./CategoryNav";
import type { Category } from "../types";

type HeaderProps = { 
    count: number
    categories: Category[]
    onSelect: (id: number) => void
    onCartClick: () => void
}
export default function Header({ count, categories, onSelect, onCartClick }: HeaderProps) {
    return (
        <header>
            <Announcement />
            <input
            type="checkbox"
            id="hamburger-menu"
            className="visually-hidden"
            />
            <div className="header-row">
            <a href="#" className="logo">
                <svg width="40" height="40" viewBox="0 0 40 40" role="img" aria-labelledby="logo-title">
                    <title id="logo-title">سوپر مارکت نمونه</title>
                    <polygon points="8,16 32,16 29,33 11,33" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                    <polyline points="14,16 17,8 23,8 26,16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="25" r="4" fill="currentColor" />
                </svg>
            </a>
            <div className="title">
                <h1>سوپر مارکت نمونه</h1>
                <p></p>
            </div>
            <form className="search-bar">
                <label htmlFor="search" className="visually-hidden">جستجو در محصولات</label>
                <input
                type="search"
                id="search"
                name="search"
                placeholder="جستجو در میان ۲۰۰۰ کالا..."
                />
                <button type="submit" className="visually-hidden">جستجو</button>
            </form>

            <a className="cart" href="#cart" onClick={(event) => { event.preventDefault(); onCartClick() }}>
                <span className="visually-hidden">سبد خرید</span>
                <img src={cartIcon} alt=""/>
                <span className="product-counter">{count.toLocaleString("fa-IR")}</span>
            </a>
            <label htmlFor="hamburger-menu" className="menu-button">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
                <span className="visually-hidden">منو</span>
            </label>
            </div>
            <CategoryNav categories={categories} onSelect={onSelect} />
        </header>
    )
}