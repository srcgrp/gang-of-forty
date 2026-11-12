import { useEffect, useState } from 'react';

const SALE_SECONDS = 2 * 60 * 60;

const pad = (n: number) => String(n).padStart(2, '0');
const toFa = (s: string) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

function format(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  return toFa(`${pad(h)}:${pad(m)}:${pad(total % 60)}`);
}

export default function SaleCountdown({ seconds = SALE_SECONDS }: { seconds?: number }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    console.log('[SaleCountdown] mount: setInterval started');
    const timer = setInterval(() => {
      console.log('[SaleCountdown] tick');
      setLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => {
      clearInterval(timer);
      console.log('[SaleCountdown] unmount: clearInterval');
    };
  }, []);

  return (
    <span className="sale-countdown">
      {left > 0 ? 'پایان حراج تا' : 'حراج به پایان رسید'}
      {left > 0 && <span className="sale-countdown-time">{format(left)}</span>}
    </span>
  );
}
