import { useEffect, useState } from "react";

export default function SaleCountdown() {
  const [left, setLeft] = useState(60);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLeft((s) => s - 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      console.log("SaleCountdown unmounted: interval stopped.");
    };
  }, []);

  return (
    <section className="sale-countdown" aria-live="polite">
      <span className="sale-countdown__label">⏳ فرصت خرید با تخفیف</span>
      <strong className="sale-countdown__time">{left} ثانیه</strong>
    </section>
  );
}
