import { gsap } from "gsap";
import { pulseCart } from "./animation.ts";

export function flyToCart(button: HTMLElement): void {
  const card = button.closest<HTMLElement>(".product-item");
  const image = card?.querySelector<HTMLElement>(
    ".product-icon img, .product-icon .product-emoji-char",
  );
  const cart = document.querySelector<HTMLElement>("#cart-button");
  const flying = image?.cloneNode(true);
  if (!image || !cart || !(flying instanceof HTMLElement)) {
    pulseCart();
    return;
  }
  const from = image.getBoundingClientRect();
  const to = cart.getBoundingClientRect();
  if (from.width <= 0 || from.height <= 0) {
    pulseCart();
    return;
  }
  Object.assign(flying.style, {
    position: "fixed",
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    objectFit: "contain",
    margin: "0",
    zIndex: "9999",
    pointerEvents: "none",
    transformOrigin: "center center",
    willChange: "transform, opacity",
  });
  if (!(image instanceof HTMLImageElement)) {
    Object.assign(flying.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: getComputedStyle(image).fontSize,
      lineHeight: "1",
    });
  }
  document.body.append(flying);
  gsap.to(flying, {
    x: to.left + to.width / 2 - (from.left + from.width / 2),
    y: to.top + to.height / 2 - (from.top + from.height / 2),
    scale: 0.15,
    rotation: 12,
    opacity: 0.25,
    duration: 0.65,
    ease: "power2.in",
    onComplete: () => {
      flying.remove();
      pulseCart();
    },
    onInterrupt: () => flying.remove(),
  });
}
