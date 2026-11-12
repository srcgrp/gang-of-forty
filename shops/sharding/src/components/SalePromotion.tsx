import { useState } from 'react'
import SaleCountdown from './SaleCountdown'

export default function SalePromotion() {
  const [open, setOpen] = useState(true)

  return (
    <div className="sale-countdown" aria-label="شمارش معکوس">
      {open ? (
        <>
          <div className="sale-countdown__content">
            <SaleCountdown />
            <span className="sale-countdown__label">زمان باقی‌مانده</span>
          </div>
          <button className="sale-countdown__close" type="button" onClick={() => setOpen(false)} aria-label="بستن شمارش معکوس">×</button>
        </>
      ) : (
        <button className="sale-countdown__show" type="button" onClick={() => setOpen(true)}>نمایش شمارش معکوس</button>
      )}
    </div>
  )
}
