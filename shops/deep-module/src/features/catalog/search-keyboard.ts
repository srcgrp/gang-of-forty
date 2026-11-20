export function setupSearchKeyboardNav(
  input: HTMLInputElement,
  box: HTMLElement,
  close: () => void
): void {
  let activeIndex = -1;

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    const items = box.querySelectorAll<HTMLButtonElement>(".search-suggestion");
    if (e.key === "Escape") {
      close();
      input.blur();
      return;
    }
    if (e.key === "ArrowDown" && items.length > 0) {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items[activeIndex]?.focus();
    }
    if (e.key === "ArrowUp" && items.length > 0) {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      items[activeIndex]?.focus();
    }
  });
}