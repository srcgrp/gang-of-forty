import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";

export function useAutoAnimate<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) autoAnimate(ref.current);
  }, []);

  return ref;
}
