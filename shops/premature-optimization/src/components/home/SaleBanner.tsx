import { useState } from "react";
import SaleCountdown from "./SaleCountdown.tsx";

export default function SaleBanner() {
  const [open, setOpen] = useState(true);

  return (
    <section className="sale-countdown" id="sale">
      <h2 className="sale-countdown-title">&#9202; حراج امروز تا پایان</h2>
      {open && <SaleCountdown />}
      <button
        className="sale-countdown-toggle"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "بستن شمارش" : "نمایش شمارش"}
      </button>
    </section>
  );
}
