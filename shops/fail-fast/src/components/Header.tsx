import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { Category } from '../types'
import TopBar from './Header/TopBar'
import SearchBox from './Header/SearchBox'
import Nav from './Header/Nav'
import ThemeToggle from './ThemeToggle'
import SpaceMarketLogo from './SpaceMarketLogo'

interface HeaderProps {
  cartCount: number
  categories: Category[]
  selectedCategoryId: number | null
  onCategoryPick: (categoryId: number) => void
}

export default function Header({
  cartCount,
  categories,
  selectedCategoryId,
  onCategoryPick,
}: HeaderProps): ReactNode {
  return (
    <header>
      <TopBar />
      <div className="header">
        <input type="checkbox" id="menu" className="menu-input" />
        <label htmlFor="menu" className="menu-btn" aria-label="منوی اصلی">
          <i></i>
          <i></i>
          <i></i>
        </label>
        <Link to="." hash="top" className="logo" aria-label="اسپیس مارکت">
          <SpaceMarketLogo />
          <span className="logo-name">اسپیس مارکت</span>
        </Link>
        <SearchBox />
        <ThemeToggle />
        <Link to="." hash="cart" className="cart" aria-label="سبد خرید">
          <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.1 11.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 8H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="18" cy="20" r="1.2" />
          </svg>
          <span>سبد خرید</span>
          <b key={cartCount} aria-live="polite">{cartCount}</b>
        </Link>
      </div>
      <Nav
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryPick={onCategoryPick}
      />
    </header>
  )
}
