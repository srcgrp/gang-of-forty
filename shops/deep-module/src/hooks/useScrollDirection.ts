import { useEffect, useRef, useState } from "react";
import { nextScrollState } from "./scrollDirection";

export function useScrollDirection(): boolean {
  const [hidden, setHidden] = useState(false);
  const stateRef = useRef({ hidden: false, anchorY: 0 });

  useEffect(() => {
    stateRef.current = { hidden: false, anchorY: window.scrollY };
    const onScroll = () => {
      const next = nextScrollState(stateRef.current, window.scrollY);
      if (next !== stateRef.current) {
        stateRef.current = next;
        setHidden(next.hidden);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
