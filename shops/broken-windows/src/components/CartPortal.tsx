import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CartPanel from "./CartPanel";

export default function CartPortal() {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const find = () => {
      const el = document.getElementById("cart-panel-root");
      if (el) setRoot(el);
    };
    find();
    const observer = new MutationObserver(find);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return root ? createPortal(<CartPanel />, root) : null;
}