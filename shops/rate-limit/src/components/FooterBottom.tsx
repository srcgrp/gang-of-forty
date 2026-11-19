import type { MouseEvent } from 'react';
import { toPersianDigits } from '../format/price';

const toTop = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function FooterBottom() {
  return (
    <div className="footer-bottom">
      <p className="footer-bottom-text">© {toPersianDigits(1405)} سوپر مارکت محدودیت نرخ. عضو دار و دسته چهل نفره</p>
      <a href="#/" className="jump-to-up" onClick={toTop}>
        پرش به بالا
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>
    </div>
  );
}