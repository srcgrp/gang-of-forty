import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { categorySearch } from '../shared/storage/url'
import MegaMenu from './MegaMenu'
import type { Category, Product } from '../shared/types'

type HeaderNavProps = { categories: Category[]; products: Product[] }

const activeOptions = { exact: true, includeHash: true }

export default memo(function HeaderNav({ categories, products }: HeaderNavProps) {
  return (
    <nav className="header-nav" aria-label="ناوبری اصلی">
    <div className="container header-nav__inner">
      <MegaMenu categories={categories} products={products} />
      <ul className="nav" id="nav-list">
        <li><Link activeOptions={activeOptions} to="/" search={true}>خانه</Link></li>
        <li><Link activeOptions={activeOptions} to="/" hash="offers" search={categorySearch('')} resetScroll={false}>پیشنهاد ویژه</Link></li>
        <li><Link activeOptions={activeOptions} to="/" hash="fruits" search={categorySearch('fruits')} resetScroll={false}>تازه‌ها</Link></li>
        <li><Link activeOptions={activeOptions} to="." hash="footer" search={true} resetScroll={false}>تماس با ما</Link></li>
      </ul>
    </div>
    </nav>
  )
})
