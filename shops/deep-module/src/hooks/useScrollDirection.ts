import { useEffect, useRef, useState } from "react";
import { nextScrollState } from "./scrollDirection";

const ANIMATION_DURATION_MS = 250;

export function useScrollDirection(): boolean {
  const [hidden, setHidden] = useState(false);
  const stateRef = useRef({ hidden: false, anchorY: 0 });
  const suppressUntilRef = useRef(0);

  useEffect(() => {
    stateRef.current = { hidden: false, anchorY: window.scrollY };

    const onScroll = () => {
      const now = performance.now();

      if (now < suppressUntilRef.current) {
        stateRef.current = {
          hidden: stateRef.current.hidden,
          anchorY: window.scrollY,
        };
        return;
      }

      const next = nextScrollState(stateRef.current, window.scrollY);
      if (next !== stateRef.current) {
        const changed = next.hidden !== stateRef.current.hidden;
        stateRef.current = next;

        if (changed) {
          setHidden(next.hidden);
          // به مدت انیمیشن، هر اسکرول دیگری را نادیده بگیر
          suppressUntilRef.current = now + ANIMATION_DURATION_MS;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
