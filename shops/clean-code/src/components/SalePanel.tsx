import { useState } from "react";
import SaleCountdown from "./SaleCountDown.tsx";

export default function SalePanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className="sale-panel box">
      <button
        type="button"
        className="sale-panel__btn"
        onClick={function () {
          setOpen(function (v) {
            return !v;
          });
        }}
      >
        {open ? "بستن شمارش‌معکوس" : "باز کردن شمارش‌معکوس"}
      </button>
      {open ? <SaleCountdown /> : null}
    </div>
  );
}
