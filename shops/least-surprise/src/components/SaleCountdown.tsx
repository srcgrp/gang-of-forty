
import { useEffect, useState } from 'react';

interface SaleCountdownProps {
  readonly initialSeconds: number;
}

export default function SaleCountdown({
  initialSeconds
}: SaleCountdownProps) {
  const [left, setLeft] = useState(initialSeconds);

  useEffect(() => {
    if (left <= 0) return;

    const timerId = window.setInterval(() => {
      setLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [left]);

  const minutes = Math.floor(left / 60);
  const seconds = left % 60;

  return (
    <section className="sale-countdown">
      <h3>زمان باقی‌مانده حراج</h3>
      <p>
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </p>
      {left === 0 && <span>حراج به پایان رسید!</span>}
    </section>
  );
}
