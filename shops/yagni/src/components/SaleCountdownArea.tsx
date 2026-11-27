import SaleCountdown from "./SaleCountdown";

interface SaleCountdownAreaProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function SaleCountdownArea({ isVisible, onToggle }: SaleCountdownAreaProps) {
  return (
    <section className="sale-countdown-area">
      <button className="sale-countdown-toggle" type="button" onClick={onToggle}
        aria-expanded={isVisible}>
        {isVisible ? "بستن شمارش معکوس تخفیف" : "نمایش شمارش معکوس تخفیف"}
      </button>
      {isVisible && <SaleCountdown />}
    </section>
  );
}
