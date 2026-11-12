import {useState} from 'react';

import CartPanel from './CartPanel';
import ProductGrid from './ProductGrid';

import type {CartLine, Category, Offer, Product, Shop} from '../types';

type HeaderProps = {
    itemCount: number;
    shop: Shop;
    categories: Category[];
    query: string;
    onQuery: (value: string) => void;
    onPickCategory: (id: number | null) => void;
    cart: CartLine[];
    products: Product[];
    total: number;
    searchResults: Product[];
    stockById: Record<number, number>;
    offerByProductId: Map<number, Offer>;
    categoryById: Map<number, Category>;
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function Header({
    itemCount,
    shop,
    categories,
    query,
    onQuery,
    onPickCategory,
    cart,
    products,
    total,
    searchResults,
    stockById,
    offerByProductId,
    categoryById,
    onAdd,
    onRemove,
}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const count = faNumber.format(itemCount);

    return (
        <header className='header' id='top'>
            <div id='top-bar'>
                <p id='top-bar-text'>{shop.notice}</p>
            </div>

            <div className='header-main'>
                <button
                    type='button'
                    id='menu-toggle'
                    className='menu-toggle'
                    aria-label='باز و بسته کردن منو'
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    ☰
                </button>

                <a
                    id='main-logo'
                    href='#top'
                    aria-label='سوپرمارکت شایان، بازگشت به بالای صفحه'
                >
                    <svg
                        viewBox='0 0 48 48'
                        width='44'
                        height='44'
                        aria-hidden='true'
                        focusable='false'
                    >
                        <rect width='48' height='48' rx='12' fill='#035efc' />
                        <path
                            d='M29 15H20.5C18 15 16 17 16 19.5S18 24 20.5 24H27.5C30 24 32 26 32 28.5S30 33 27.5 33H19'
                            fill='none'
                            stroke='#fff'
                            strokeWidth='3.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M21 15V33M27 15V33M21 24H27'
                            fill='none'
                            stroke='#f8c566'
                            strokeWidth='3'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    <span>سوپرمارکت شایان</span>
                </a>

                <div className='header-search'>
                    <div className='header-search-field'>
                        <span aria-hidden='true'>⌕</span>
                        <input
                            type='search'
                            id='search'
                            name='search'
                            value={query}
                            onChange={(event) => onQuery(event.target.value)}
                            aria-label='جستجوی محصولات'
                            placeholder='نام محصول مورد نظرت رو جستجو کن...'
                        />
                        {query && (
                            <button
                                type='button'
                                className='search-clear'
                                onClick={() => onQuery('')}
                                aria-label='پاک کردن جستجو'
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {query.trim() && (
                        <div className='search-dropdown'>
                            <div className='search-dropdown-heading'>
                                <strong>نتایج جستجو</strong>
                                <span>
                                    {faNumber.format(searchResults.length)}{' '}
                                    محصول
                                </span>
                            </div>

                            {searchResults.length > 0 ? (
                                <ProductGrid
                                    products={searchResults}
                                    onAdd={onAdd}
                                    stockById={stockById}
                                    offerByProductId={offerByProductId}
                                    categoryById={categoryById}
                                />
                            ) : (
                                <p className='search-empty'>
                                    محصولی با این نام پیدا نشد.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className='header-cart'>
                    <button
                        type='button'
                        id='cart'
                        aria-label={`سبد خرید، ${count} کالا`}
                        aria-expanded={cartOpen}
                        onClick={() => setCartOpen((open) => !open)}
                    >
                        <span aria-hidden='true'>🛒</span>
                        <span>سبد خرید</span>
                        <span className='cart-count' id='cart-count'>
                            {count}
                        </span>
                    </button>

                    {cartOpen && (
                        <div className='cart-dropdown'>
                            <CartPanel
                                cart={cart}
                                products={products}
                                total={total}
                                onAdd={onAdd}
                                onRemove={onRemove}
                            />
                        </div>
                    )}
                </div>
            </div>

            <nav
                className={`main-nav${menuOpen ? ' menu-open' : ''}`}
                aria-label='منوی اصلی'
            >
                <ul className='main-nav-items' id='main-menu'>
                    <li className='all-categories-menu'>
                        <button
                            type='button'
                            className='categories-links'
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                        >
                            همه دسته‌ها
                        </button>

                        {menuOpen && (
                            <ul className='categories-dropdown'>
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                onPickCategory(category.id);
                                                setMenuOpen(false);
                                            }}
                                        >
                                            {category.emoji} {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    {shop.menu.map((item) => (
                        <li key={item.href}>
                            <a className='categories-links' href={item.href}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
