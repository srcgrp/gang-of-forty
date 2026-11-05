import { useState, useEffect } from "react";

export function SaleCountdown() {
  const [seconds, setSeconds] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="sale-countdown">
      ⏳ زمان باقی‌مانده: {mins} دقیقه و {secs} ثانیه
    </div>
  );
}
