import MegaMenu from './MegaMenu'
import type { Category, Product } from '../shared/types'

type HeaderNavProps = { categories: Category[]; products: Product[] }

export default function HeaderNav({ categories, products }: HeaderNavProps) {
  return (
    <nav className="header-nav" aria-label="ناوبری اصلی">
    <div className="container header-nav__inner">
      <MegaMenu categories={categories} products={products} />
      <ul className="nav" id="nav-list">
        <li><a href="#main-content">خانه</a></li>
        <li><a href="#offers">پیشنهاد ویژه</a></li>
        <li><a href="#fruits">تازه‌ها</a></li>
        <li><a href="#footer">تماس با ما</a></li>
      </ul>
    </div>
    </nav>
  )
}
