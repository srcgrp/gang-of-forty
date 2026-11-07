import { useState } from 'react';

export default function CartPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div id="cart-wrap" className={open ? "cart-wrap is-open" : "cart-wrap"}>
      <button className="cart" id="cart-btn" type="button" aria-label="سبد خرید، ۰ کالا" aria-expanded={open} onClick={() => setOpen(!open)} aria-controls="cart-panel">
        <span aria-hidden="true">
          <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-cart" /></svg>
          <span className="cart-txt">سبد خرید</span>
        </span>
        <b id="cart-count" aria-hidden="true">۰</b>
      </button>
      <section className="cart-panel" id="cart-panel" aria-label="خلاصه سبد خرید" tabIndex={-1}>
        <div className="mini mini--empty">
          <h2 className="mini__title">خلاصه سبد خرید شما</h2>
          <svg className="icon mini__empty-icon" aria-hidden="true" focusable="false"><use href="#i-cart" /></svg>
          <p>سبد خرید شما خالی است.</p>
        </div>
      </section>
    </div>
  );
}