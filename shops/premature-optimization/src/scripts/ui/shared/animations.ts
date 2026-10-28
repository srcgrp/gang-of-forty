import { gsap } from "gsap";

export function animateCartIcon(): void {
  const cartButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>("#cart-button");
  if (!cartButton) return;

  gsap.killTweensOf(cartButton);
  gsap.fromTo(
    cartButton,
    { scale: 1 },
    {
      scale: 1.2,
      duration: 0.16,
      repeat: 1,
      yoyo: true,
      ease: "power2.out",
      onComplete: (): void => {
        gsap.set(cartButton, { clearProps: "transform" });
      },
    },
  );
}

export function animateProductToCart(button: HTMLButtonElement): void {
  const card: HTMLElement | null = button.closest<HTMLElement>(".product-item");
  const productImage: HTMLImageElement | null =
    card?.querySelector<HTMLImageElement>(".product-icon img") ?? null;
  const cartButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>("#cart-button");

  if (!productImage || !cartButton) {
    animateCartIcon();
    return;
  }

  const imageRect: DOMRect = productImage.getBoundingClientRect();
  const cartRect: DOMRect = cartButton.getBoundingClientRect();
  if (imageRect.width <= 0 || imageRect.height <= 0) {
    animateCartIcon();
    return;
  }

  const flyingImage: HTMLImageElement = productImage.cloneNode(
    true,
  ) as HTMLImageElement;
  Object.assign(flyingImage.style, {
    position: "fixed",
    left: `${imageRect.left}px`,
    top: `${imageRect.top}px`,
    width: `${imageRect.width}px`,
    height: `${imageRect.height}px`,
    objectFit: "contain",
    margin: "0",
    zIndex: "9999",
    pointerEvents: "none",
    transformOrigin: "center center",
    willChange: "transform, opacity",
  });
  document.body.append(flyingImage);

  const deltaX: number =
    cartRect.left + cartRect.width / 2 - (imageRect.left + imageRect.width / 2);
  const deltaY: number =
    cartRect.top + cartRect.height / 2 - (imageRect.top + imageRect.height / 2);

  gsap.to(flyingImage, {
    x: deltaX,
    y: deltaY,
    scale: 0.15,
    rotation: 12,
    opacity: 0.25,
    duration: 0.65,
    ease: "power2.in",
    onComplete: (): void => {
      flyingImage.remove();
      animateCartIcon();
    },
    onInterrupt: (): void => flyingImage.remove(),
  });
}

export function animateProductCards(container: HTMLElement): void {
  const cards: NodeListOf<HTMLElement> =
    container.querySelectorAll<HTMLElement>(".product-item");
  if (cards.length > 0) {
    gsap.from(cards, {
      opacity: 0,
      duration: 0.5,
      stagger: 0.35,
      ease: "power2.out",
      clearProps: "all",
    });
  }
}

export function setCarouselPosition(element: HTMLElement, x: number): void {
  gsap.set(element, { x });
}

export function animateCarouselTo(element: HTMLElement, x: number): void {
  gsap.to(element, { x, duration: 0.2, ease: "power2.out", overwrite: true });
}

export function animateSections(container: HTMLElement): void {
  const sections = container.querySelectorAll<HTMLElement>(".recommendation");
  if (!sections.length) return;

  gsap.from(sections, {
    opacity: 0,
    y: 24,
    duration: 0.45,
    stagger: 0.18,
    ease: "power2.out",
    clearProps: "all",
  });
}
