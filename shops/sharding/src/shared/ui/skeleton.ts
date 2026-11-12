export function hideSkeletons(): void {
  document.querySelectorAll<HTMLElement>('.skeleton').forEach((el) => { el.hidden = true; });
}