import { useId, useState } from 'react'
import SaleCountdown from './SaleCountdown'

export default function SalePromotion() {
  const [open, setOpen] = useState(true)
  const countdownId = useId()

  return (
    <div className="sale-countdown" data-open={open}>
      <div className="sale-countdown__content" id={countdownId} hidden={!open}>
        <span className="sale-countdown__label">زمان باقی‌مانده</span>
        {open && <SaleCountdown />}
      </div>
      <button
        className="sale-countdown__toggle"
        type="button"
        onClick={() => setOpen((visible) => !visible)}
        aria-controls={countdownId}
        aria-expanded={open}
        aria-label={open ? 'بستن شمارش معکوس' : 'نمایش شمارش معکوس'}
      >
        <svg aria-hidden="true"><use href={open ? './icons.svg#close' : './icons.svg#clock'} /></svg>
        {!open && <span>نمایش زمان</span>}
      </button>
    </div>
  )
}
