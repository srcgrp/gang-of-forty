export function openModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";
}

export function closeModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("modal--open");
  if (!document.querySelector(".modal--open")) {
    document.body.style.overflow = "";
  }
}

export function closeAllModals(): void {
  document.querySelectorAll<HTMLElement>(".modal--open").forEach((m) => {
    closeModal(m.id);
  });
}