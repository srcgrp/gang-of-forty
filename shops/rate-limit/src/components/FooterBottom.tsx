import { toPersianDigits } from '../format/price';

export default function FooterBottom() {
  return (
    <div className="footer-bottom">
      <p className="footer-bottom-text">© {toPersianDigits(1405)} سوپر مارکت محدودیت نرخ. عضو دار و دسته چهل نفره</p>
      <a href="#top" className="jump-to-up">
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