import type { ReactNode } from 'react';
import type { CategoryListProps } from './CategoryLink';
import CategoryNav from './CategoryNav';


type HeaderProps = CategoryListProps & {
  productCount: number;
  query: string;
  onSearch: (text: string) => void;
  cartCount: number;
  cartOpen: boolean;
  onCartToggle: () => void;
  cartPanel: ReactNode;
};

export default function Header({ categories, categoryId, onPick, productCount, query, onSearch, cartCount, cartOpen, onCartToggle, cartPanel }: HeaderProps) {
  const count = cartCount.toLocaleString('fa-IR');
  return (
    <>
    <a className="skip" href="#main">پرش به محتوای اصلی</a>
    <section className="header-banner" id="notice" aria-label="اطلاعیه">
      <svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-truck" /></svg>
      <span>ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
    </section>
    <header className="site-header">
      <div className="bar">
        <a className="logo" href="#top" aria-label="سوپرمارکت آرمین، بازگشت به بالای صفحه">
          <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logo-title logo-desc">
            <title id="logo-title">Armin Supermarket Logo</title>
            <desc id="logo-desc">{"\n              A glossy green shopping cart logo with a golden check mark.\n          "}</desc>
            <defs>
              <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9AF3BA" />
                <stop offset="45%" stopColor="#45C985" />
                <stop offset="100%" stopColor="#07965C" />
              </linearGradient>
              <linearGradient id="green-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C5FFE0" />
                <stop offset="35%" stopColor="#68D99B" />
                <stop offset="100%" stopColor="#0B9D60" />
              </linearGradient>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE58A" />
                <stop offset="35%" stopColor="#FFC83D" />
                <stop offset="70%" stopColor="#F6A900" />
                <stop offset="100%" stopColor="#D88A00" />
              </linearGradient>
              <linearGradient id="white-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#F5F7F2" />
                <stop offset="100%" stopColor="#DDE4DB" />
              </linearGradient>
              <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#000000" floodOpacity="0.28" /></filter>
              <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.22" /></filter>
            </defs>
            <path d="
                        M 215 251
                        L 276 117
                        Q 281 108 291 108
                        L 326 108
                        Q 336 108 341 118
                        L 364 169
                        L 322 182
                        L 306 150
                        L 277 204
                        Z
                    " fill="url(#green-gradient)" filter="url(#shadow)" />
            <path d="
                        M 218 246
                        L 278 119
                        Q 282 111 291 111
                        L 319 111
                        Q 304 114 299 124
                        L 252 223
                        Z
                    " fill="#B7F9CF" opacity="0.28" />
            <path d="
                        M 337 217
                        L 366 200
                        L 401 273
                        Q 404 280 397 283
                        L 371 283
                        Q 364 283 361 277
                        Z
                    " fill="url(#green-gradient)" filter="url(#shadow)" />
            <path d="
                        M 340 219
                        L 363 205
                        L 393 272
                        L 375 276
                        Z
                    " fill="#A4F2C3" opacity="0.22" />
            <path d="
                        M 208 277
                        C 250 231 304 205 366 182
                        C 393 172 422 166 451 166
                        C 422 177 390 191 357 207
                        C 303 233 256 258 222 291
                        Z
                    " fill="url(#gold-gradient)" filter="url(#soft-shadow)" />
            <path d="
                        M 215 273
                        C 260 232 311 209 365 190
                        C 391 181 416 174 437 170
                        C 399 181 365 194 333 209
                        C 283 232 244 253 215 279
                        Z
                    " fill="#FFF1A8" opacity="0.35" />
            <path d="
                        M 48 108
                        H 116
                        Q 130 108 135 122
                        L 176 260
                        Q 181 277 199 277
                        H 395
                        Q 407 277 412 265
                        L 445 181
                    " fill="none" stroke="url(#white-gradient)" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)" />
            <path d="
                        M 49 103
                        H 115
                        Q 131 103 137 120
                        L 177 258
                    " fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
            <path d="
                        M 188 336
                        H 397
                    " fill="none" stroke="url(#white-gradient)" strokeWidth="27" strokeLinecap="round" filter="url(#shadow)" />
            <path d="
                        M 190 331
                        H 397
                    " fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
            <rect x="70" y="187" width="66" height="21" rx="10.5" fill="url(#green-gradient)" filter="url(#soft-shadow)" />
            <rect x="41" y="225" width="112" height="21" rx="10.5" fill="url(#green-gradient)" filter="url(#soft-shadow)" />
            <rect x="76" y="263" width="91" height="21" rx="10.5" fill="url(#green-gradient)" filter="url(#soft-shadow)" />
            <circle cx="225" cy="390" r="29" fill="url(#gold-gradient)" filter="url(#shadow)" />
            <circle cx="377" cy="390" r="29" fill="url(#gold-gradient)" filter="url(#shadow)" />
            <circle cx="217" cy="382" r="8" fill="#FFF0A7" opacity="0.55" />
            <circle cx="369" cy="382" r="8" fill="#FFF0A7" opacity="0.55" />
          </svg>
          <span>
            <b>سوپرمارکت آرمین</b>
            <small>همه‌چیز برای یک خرید خوب</small>
          </span>
        </a>
        <form className="search" role="search" action="./" onSubmit={event => { event.preventDefault(); onSearch(String(new FormData(event.currentTarget).get("q") ?? "")); }}>
          <label className="sr-only" htmlFor="q">جستجوی کالا</label>
          <span className="search-ico" aria-hidden="true"><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-search" /></svg></span>
          <input key={query} name="q" defaultValue={query} id="q" type="search" placeholder={`جستجو در میان ${productCount.toLocaleString('fa-IR')} کالا…`} autoComplete="off" />
        </form>
        <div id="cart-wrap" className={cartOpen ? 'cart-wrap is-open' : 'cart-wrap'}>
          <button className="cart" id="cart-btn" type="button" aria-label={`سبد خرید، ${count} کالا`} aria-expanded={cartOpen} onClick={onCartToggle} aria-controls="cart-panel">
            <span aria-hidden="true">
              <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-cart" /></svg>
              <span className="cart-txt">سبد خرید</span>
            </span>
            <b id="cart-count" aria-hidden="true">{count}</b>
          </button>
          {cartPanel}
        </div>
        <input className="sr-only menu-toggle" type="checkbox" id="menu-toggle" aria-controls="primary-nav" />
        <label className="burger" htmlFor="menu-toggle">
          <span className="sr-only">باز و بسته کردن منوی اصلی</span>
          <span className="bars" />
        </label>
        <label className="scrim" htmlFor="menu-toggle" aria-hidden="true" />
        <nav className="main-nav" id="primary-nav" aria-label="منوی اصلی">
          <ul id="nav-list">
            <li className="mega">
              <a href="#categories">
                <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-menu" /></svg>
                {" همه دسته‌ها"}
              </a>
              <CategoryNav menu categories={categories} categoryId={categoryId} onPick={onPick} />
            </li>
            <li><a href="#offers">پیشنهاد ویژه</a></li>
            <li><a href="#fruits">میوه و سبزی</a></li>
            <li><a href="#dairy">لبنیات</a></li>
            <li><a href="#bakery">نان تازه</a></li>
            <li><a href="#contact">تماس با ما</a></li>
          </ul>
        </nav>
      </div>
    </header>
    </>
  );
}