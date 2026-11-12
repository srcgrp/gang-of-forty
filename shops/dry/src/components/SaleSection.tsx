import { useState } from 'react'
import SaleCountdown from './SaleCountdown.tsx'

export default function SaleSection() {
  const [open, setOpen] = useState(true)

  return (
    <section className="sale" aria-label="تخفیف ویژه">
      <h2>تخفیف ویژه</h2>
      {open && <SaleCountdown />}
      <button type="button" onClick={() => setOpen(!open)}>
        {open ? 'بستن شمارش معکوس' : 'نمایش شمارش معکوس'}
      </button>
    </section>
  )
}