import { useEffect, useRef, type ReactNode } from 'react';

export type CartMode = 'closed' | 'hover' | 'pinned';
type Props = { count: number; mode: CartMode; onMode: (mode: CartMode) => void; children: ReactNode };

export default function CartMenu({ count, mode, onMode, children }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const open = mode !== 'closed';
  const label = count.toLocaleString('fa-IR');

  useEffect(() => {
    if (!open) return;
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (wrapper.current?.contains(document.activeElement)) button.current?.focus();
        onMode('closed');
      }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !wrapper.current?.contains(event.target)) onMode('closed');
    }
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open, onMode]);

  return (
    <div id="cart-wrap" ref={wrapper} className={open ? 'cart-wrap is-open' : 'cart-wrap'}
      onPointerEnter={event => { if (event.pointerType === 'mouse' && !open) onMode('hover'); }}
      onPointerLeave={() => { if (mode === 'hover') onMode('closed'); }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) onMode('closed'); }}>
      <button className="cart" id="cart-btn" ref={button} type="button" aria-label={`سبد خرید، ${label} کالا`}
        aria-expanded={open} aria-controls="cart-panel" onClick={() => onMode(mode === 'pinned' ? 'closed' : 'pinned')}>
        <span aria-hidden="true">
          <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-cart" /></svg>
          <span className="cart-txt">سبد خرید</span>
        </span>
        <b id="cart-count" aria-hidden="true">{label}</b>
      </button>
      {children}
    </div>
  );
}
