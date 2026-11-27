import { useEffect, useState } from "react";

function CountdownTimer() {
  const [left, setLeft] = useState(120);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const minutes = Math.floor(left / 60).toLocaleString("fa-IR");
  const seconds = (left % 60).toLocaleString("fa-IR", {
    minimumIntegerDigits: 2,
  });

  return (
    <span className="sale-countdown-time" role="timer" aria-live="polite">
      {minutes}:{seconds}
    </span>
  );
}

export default function SaleCountdown() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="sale-countdown-reopen">
        <button type="button" onClick={() => setVisible(true)}>
          نمایش زمان حراج
        </button>
      </div>
    );
  }

  return (
    <section className="sale-countdown" aria-label="شمارش معکوس حراج">
      <div className="sale-countdown-title-row">
        <h3 className="sale-countdown-title">شمارش معکوس حراج</h3>

        <button
          type="button"
          className="sale-countdown-close"
          aria-label="بستن شمارش معکوس"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>

      <div className="sale-countdown-content">
        <span className="sale-countdown-label">زمان باقی‌مانده:</span>
        <CountdownTimer />
      </div>
    </section>
  );
}
