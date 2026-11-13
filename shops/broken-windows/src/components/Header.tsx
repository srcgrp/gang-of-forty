import { formatNumber } from "../format";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";
type Props = { cartCount: number;
     query: string;
  onQuery: (value: string) => void;
 };
export default function Header({ cartCount, query, onQuery }: Props) {  
     return (
<>
  <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-label="باز و بسته کردن منو"/>
    <div className="discount" id="notice">ارسال رایگان برای خرید های بالای{formatNumber(200)} هزار تومن</div>
    <div className="header" id="header">
        <label htmlFor="menu-toggle" className="menu-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                aria-hidden="true">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
            </svg></label>
        <a className="brand" href="#top" title="پرش به ابتدای صفحه" aria-label="فروشگاه سارا مارکت">
            <svg className="brand-logos" aria-hidden="true" viewBox="0 0 64 64" width="64" height="64">
                <rect width="64" height="64" rx="16" fill="#0F6E56" />
                <path d="M24 26 V22 A8 8 0 0 1 40 22 V26" fill="none" stroke="#FBEAF0" stroke-width="3"
                    stroke-linecap="round" />
                <rect x="16" y="24" width="32" height="26" rx="5" fill="#fff" />
                <path d="M32 44 C25 39 25 32 29.5 32 C31 32 32 33 32 34 C32 33 33 32 34.5 32 C39 32 39 39 32 44 Z"
                    fill="#D4537E" />
            </svg>
            <div className="brand-text">
                <p className="brand-name"> <b>سارا مارکت</b></p>
                <p className="brand-text">انتخاب های سارا برای شما</p>
            </div>
        </a>
      <SearchBox query={query} onQuery={onQuery} />
      
        <a className="user-account" href="#" aria-label="ورود به حساب کاربری">
            <svg aria-hidden="true" className="user-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
            <span className="user-account-label">ورود</span></a>
        <a className="cart" href="#" aria-label={`سبد خرید، ${cartCount} کالا`}>
            <span className="cart-icon"><svg aria-hidden="true" className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg></span>
            
            
            <span className="cart-label">سبد خرید</span>
            <span className="cart-count">{formatNumber(cartCount)}</span> 
            </a>
            <ThemeToggle />
    </div>

   </> 
  )
}
