
import { selectProducts } from '../features/products/select'
import CartPanel from './CartPanel'
import CategoryNav from './CategoryNav'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import ProductGrid from './ProductGrid'
import SaleCountdown from './SaleCountdown'
import type { ShopPageProps } from './Shop-page.types'

export default function ShopPage(props: ShopPageProps) {
  const { products, categories, home, shop, lines, total, count, categoryId,
    onPick, query, onQuery, showAll, onToggleAll, onAdd, onRemove, onQuantity,
    isCartOpen, onOpenCart, onCloseCart, showCountdown, onCloseCountdown,
    onShowCountdown } = props
  const results = selectProducts(products, categoryId, query)
  const visible = categoryId !== null || query.trim() || showAll ? results : results.slice(0, 12)

  return (
    <>
      <a className="skip-link" href="#content">پرش به محتوای اصلی</a>
      <Header shop={shop} categories={categories} cartCount={count} query={query}
        onQuery={onQuery} onOpenCart={onOpenCart} onPickCategory={onPick} />
      <main id="content" tabIndex={-1}>
        <h1 className="sr-only">فروشگاه</h1>
        <Hero main={home.hero} side={home.side} />
        <CategoryNav categories={categories} activeId={categoryId} onPick={onPick} />
        {showCountdown && <SaleCountdown onClose={onCloseCountdown} />}
        <div className="shop-layout container">
          <ProductGrid products={visible} onAdd={onAdd} showAll={showAll}
            onToggleAll={onToggleAll} showToggle={categoryId === null && !query.trim()}
            showSaleButton={!showCountdown} onShowSale={onShowCountdown} />
        </div>
      </main>
      <Footer shop={shop} categories={categories} />
      <div className={`cart-root${isCartOpen ? ' is-open' : ''}`}>
        <div className="cart-overlay" aria-hidden="true" onClick={onCloseCart} />
        <CartPanel lines={lines} total={total} onRemove={onRemove}
          onQuantity={onQuantity} onClose={onCloseCart} />
      </div>
    </>
  )
}
