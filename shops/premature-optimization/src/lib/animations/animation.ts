import { gsap } from "gsap";

export function revealSections(container: HTMLElement): () => void {
  const ctx = gsap.context(() => {
    gsap.from(".recommendation", {
      opacity: 0,
      y: 24,
      duration: 0.45,
      stagger: 0.18,
      ease: "power2.out",
      clearProps: "all",
    });
  }, container);
  return () => ctx.revert();
}

export function revealCards(list: HTMLElement): () => void {
  const ctx = gsap.context(() => {
    gsap.from(".product-item", {
      opacity: 0,
      duration: 0.5,
      stagger: 0.35,
      ease: "power2.out",
      clearProps: "all",
    });
  }, list);
  return () => ctx.revert();
}

export function pulseCart(): void {
  const button = document.querySelector<HTMLElement>("#cart-button");
  if (!button) return;
  gsap.killTweensOf(button);
  gsap.fromTo(
    button,
    { scale: 1 },
    {
      scale: 1.2,
      duration: 0.16,
      repeat: 1,
      yoyo: true,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(button, { clearProps: "transform" });
      },
    },
  );
}
