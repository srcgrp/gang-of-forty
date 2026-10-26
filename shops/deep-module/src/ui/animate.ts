
import autoAnimate from "@formkit/auto-animate";

export function setupAutoAnimate(): void {
  const containers = ["cart-body", "all-track", "search-suggestions"];
  for (const id of containers) {
    const el = document.getElementById(id);
    if (el) autoAnimate(el);
  }
}