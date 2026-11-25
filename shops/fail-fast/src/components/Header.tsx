import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { Category } from '../types'
import logoImg from '../images/space-market-logo.svg'
import TopBar from './Header/TopBar'
import SearchBox from './Header/SearchBox'
import Nav from './Header/Nav'
import ThemeToggle from './ThemeToggle'

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
        <Link to="." hash="top" className="logo">
          <img src={logoImg} width="120" height="50" alt="اسپیس مارکت" />
          <div>
            <strong>اسپیس مارکت</strong>
            <small>هر روز و هر ساعت</small>
          </div>
        </Link>
        <SearchBox />
        <ThemeToggle />
        <Link to="." hash="cart" className="cart" aria-label="سبد خرید">
          <span className="cart-icon" id="cart-icon" aria-hidden="true"></span>
          <span>سبد خرید</span>
          <b aria-live="polite">{cartCount}</b>
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
