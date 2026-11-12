import SaleCountdown from "./SaleCountdown";

type Props = { open: boolean; onToggle: () => void };
export default function SaleBanner({ open, onToggle }: Props) {
  return (
    <section className="sale-banner" aria-labelledby="sale-banner-title">
      <div className="sale-banner-heading">
        <div><span className="sale-badge">پیشنهاد ویژهٔ بت‌شاپ</span>
          <h2 id="sale-banner-title">شمارش معکوس حراج</h2>
          <p>زمان باقی‌مانده را همین‌جا دنبال کن.</p>
        </div>
        <button type="button" onClick={onToggle} className="sale-toggle"
          aria-expanded={open} aria-controls={open ? "sale-countdown" : undefined}>
          {open ? "بستن شمارش معکوس" : "شروع شمارش معکوس"}
          <span aria-hidden="true">{open ? "−" : "←"}</span>
        </button>
      </div>
      {open && <SaleCountdown />}
    </section>
  );
}
