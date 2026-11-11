import type { ReactNode } from 'react'

export default function CartPanel(): ReactNode {
  return (
    <div id="cart" className="cart-panel">
      <h2>سبد خرید</h2>
      <p>سبد خرید شما خالی است</p>
    </div>
  )
}
