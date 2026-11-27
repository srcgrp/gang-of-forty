import { useEffect, useState } from 'react';

const SALE_DURATION_SECONDS = 5 * 60;
const twoDigits = new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 });

export default function SaleCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(SALE_DURATION_SECONDS);

  useEffect(() => {
    let ticksRemaining = SALE_DURATION_SECONDS;
    if (import.meta.env.DEV) console.debug('[SaleCountdown] interval started');
    const intervalId = window.setInterval(() => {
      if (import.meta.env.DEV) console.debug('[SaleCountdown] tick');
      setSecondsLeft((current) => Math.max(0, current - 1));
      ticksRemaining -= 1;
      if (ticksRemaining <= 0) window.clearInterval(intervalId);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      if (import.meta.env.DEV) console.debug('[SaleCountdown] interval cleared');
    };
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = secondsLeft > 0 ? 'زمان باقی‌مانده حراج' : 'زمان این شمارشگر به پایان رسید';

  return (
    <div className="sale-countdown" role="timer" aria-label={`${label}: ${twoDigits.format(minutes)}:${twoDigits.format(seconds)}`}>
      <span className="sale-countdown__label">{label}</span>
      <strong className="sale-countdown__time" dir="ltr">
        {twoDigits.format(minutes)}:{twoDigits.format(seconds)}
      </strong>
    </div>
  );
}
