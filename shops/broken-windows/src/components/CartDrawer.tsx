import { useEffect, useRef } from "react";
import CartPanel from "./CartPanel";
import { useCartDrawerStore } from "../hooks/useCartDrawerStore";

export default function CartDrawer() {
  const isOpen = useCartDrawerStore((s) => s.isOpen);
  const close = useCartDrawerStore((s) => s.close);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="سبد خرید">
      <div className="cart-drawer-backdrop" onClick={close} />
      <div className="cart-drawer-sheet">
        <div className="cart-drawer-top">
          <button ref={closeRef} type="button" className="cart-drawer-close" onClick={close} aria-label="بستن سبد خرید">✕</button>
        </div>
        <CartPanel id="cart-drawer-panel" onNavigate={close} />
      </div>
    </div>
  );
}