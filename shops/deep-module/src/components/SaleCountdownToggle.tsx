import { useState } from "react";
import { SaleCountdown } from "./SaleCountdown";

export function SaleCountdownToggle() {
  const [open, setOpen] = useState(true);

  return (
    <div className="sale-countdown-wrap">
      <button
        type="button"
        className="sale-countdown-toggle"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "⏹ بستن شمارنده (unmount)" : "▶️ باز کردن شمارنده (mount)"}
      </button>
      {open && <SaleCountdown />}
    </div>
  );
}
