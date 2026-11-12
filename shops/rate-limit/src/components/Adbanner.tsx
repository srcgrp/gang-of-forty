export default function AdBanner() {
  return (
    <a className="ad-banner" href="#fruits" aria-label="۲۰٪ تخفیف اولین سفارش با کد NEW20">
      <div className="ad-content">
        <span className="ad-tag">ویژه مشتریان جدید</span>
        <p className="ad-title">۲۰٪ تخفیف اولین سفارش شما</p>
        <p className="ad-text">
          با کد <strong className="ad-code">NEW20</strong> اولین خریدت از محدودیت نرخ رو ارزون‌تر تجربه کن.
        </p>
        <span className="ad-cta">همین حالا سفارش بده</span>
      </div>

      <div className="ad-visual" aria-hidden="true">
        <span>🧺</span>
        <span>🥑</span>
        <span>🍋</span>
      </div>
    </a>
  );
}