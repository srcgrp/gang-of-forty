import { useState } from "react"
import SaleCountdown from "./SaleCountdown"

// Shows or hides the countdown, so we can see mount and unmount in the Console.
export default function SaleBox() {
  const [open, setOpen] = useState(true)

  return (
    <div className="sale-box">
      {open && <SaleCountdown />}
      <button type="button" className="sale-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "پنهان کردن" : "نمایش زمان حراج"}
      </button>
    </div>
  )
}
