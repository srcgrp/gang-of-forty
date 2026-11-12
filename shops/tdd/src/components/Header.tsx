import type { CartLine, Category, Product } from '../shared/types'
import CartPanel from './CartPanel'
import CategoryNav from './CategoryNav'

type HeaderProps = {
    categories: Category[]
    categoryId: number | null
    cart: CartLine[]
    products: Product[]
    cartCount: number
    cartTotal: number
    onPick: (categoryId: number) => void
    onRemove: (productId: number) => void
    onClear: () => void
}

export default function Header({ categories, categoryId, cart, products, cartCount, cartTotal, onPick, onRemove, onClear }: HeaderProps) {
    return (
        <>
            <a className="skip-link" href="#main-content">پرش به محتوای اصلی</a>

            <header className="site-header">
                <p className="announcement" id="shop-notice" role="status"></p>

                <div className="header-content">
                    <a className="brand" href="./" aria-label="سام مارکت؛ بازگشت به بالای صفحه">
                        <svg className="brand-mark" viewBox="0 0 225 205" role="img" aria-labelledby="logo-title logo-description">
                            <title id="logo-title">لوگوی سام مارکت</title>
                            <desc id="logo-description">سبد خرید با براکت‌های کد، تیک سبز و حروف TDD؛ پیکان و سه نقطه قرمز، سبز و آبی نماد چرخه توسعه آزمون‌محور هستند.</desc>
                            <path d="M35 83H168C189 83 199 70 199 55S188 29 168 29H73" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                            <path d="M85 17 71 29 85 41" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="m39 83 19 82c2 10 8 15 19 15h70c11 0 17-5 19-15l18-82" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="m87 111-17 19 17 19m56-38 17 19-17 19" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="m101 132 9 10 20-24" fill="none" stroke="#2ab888" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" aria-hidden="true">
                                <path d="M89 157h10m-5-0v12" />
                                <path d="M106 157v12h4c8 0 8-12 0-12h-4Z" />
                                <path d="M123 157v12h4c8 0 8-12 0-12h-4Z" />
                            </g>
                            <circle cx="60" cy="83" r="7" fill="#ee7466" />
                            <circle cx="112" cy="83" r="7" fill="#2ab888" />
                            <circle cx="164" cy="83" r="7" fill="#739ff0" />
                        </svg>
                        <span>
                            <strong>سام مارکت</strong>
                            <small id="shop-slogan"></small>
                        </span>
                    </a>

                    <form className="search" role="search" action="#main-content">
                        <label htmlFor="site-search">جست‌وجوی محصولات</label>
                        <input id="site-search" name="q" type="search" placeholder="دنبال چه محصولی هستید؟" />
                        <button type="submit">جست‌وجو</button>
                    </form>

                    <CartPanel cart={cart} products={products} count={cartCount} total={cartTotal} onRemove={onRemove} onClear={onClear} />
                </div>

                <p id="cart-status" className="page-status" role="status"></p>
                <CategoryNav categories={categories} activeCategoryId={categoryId} onPick={onPick} />
            </header>
        </>
    )
}
