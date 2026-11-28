import { useEffect, useState } from "react";

const SALE_SECONDS = 60 * 60;
const twoDigits = new Intl.NumberFormat("fa-IR", {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export default function SaleCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(SALE_SECONDS);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const displayTime = [hours, minutes, seconds].map((value) => twoDigits.format(value)).join(":");

  return (
    <span className="product-unit" role="timer" aria-label={`زمان باقی‌مانده ${displayTime}`}>
      زمان باقی‌مانده: {displayTime}
    </span>
  );
}
