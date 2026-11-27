import { useEffect, useState } from "react";
import { formatNumber } from "../shared/format";

const SALE_SECONDS = 300;
export default function SaleCountdown() {
  const [left, setLeft] = useState(SALE_SECONDS);
  useEffect(() => {
    console.info("SaleCountdown: تایمر شروع شد");
    let remaining = SALE_SECONDS;
    const interval = window.setInterval(() => {
      remaining -= 1;
      console.info("SaleCountdown: یک ثانیه گذشت", remaining);
      setLeft(previous => Math.max(0, previous - 1));
      if (remaining === 0) window.clearInterval(interval);
    }, 1000);
    return () => {
      window.clearInterval(interval);
      console.info("SaleCountdown: تایمر متوقف شد (cleanup)");
    };
  }, []);
  const minutes = Math.floor(left / 60);
  const seconds = left % 60;
  return (
    <div id="sale-countdown" className="sale-countdown">
      <span>{left === 0 ? "زمان حراج تمام شد" : "زمان باقی‌ماندهٔ حراج"}</span>
      <strong role="timer" aria-label="زمان باقی‌مانده" dir="ltr">
        {formatNumber(minutes)}:{seconds.toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
      </strong>
      <small>این زمان‌سنج نمایشی است و تخفیف محصولات را تغییر نمی‌دهد.</small>
    </div>
  );
}
