import { openModal, closeModal, closeAllModals } from "./modal";

export function setupGlobalEvents(onCartOpen: () => void, onRetryBoot: () => void): void {
  document.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    if (e.target.closest("#cart-btn")) {
      e.preventDefault();
      openModal("cart-modal");
      onCartOpen();
      return;
    }
    const closeEl = e.target.closest<HTMLElement>("[data-close]");
    if (closeEl) {
      e.preventDefault();
      const id = closeEl.dataset.close;
      if (id) closeModal(id);
      return;
    }
    if (e.target.classList.contains("modal__overlay")) {
      const modal = e.target.closest<HTMLElement>(".modal");
      if (modal) closeModal(modal.id);
    }
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") closeAllModals();
  });

  window.addEventListener("online", onRetryBoot);
}