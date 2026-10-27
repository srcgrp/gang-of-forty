export function goToFragment(): void {
  const id = window.location.hash.slice(1);
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ block: "start", inline: "nearest" });
  }
}
export function bindMobileMenu(): void {
  const links = document.querySelector<HTMLElement>("#mobile-links");
  const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
  if (!links || !menu) throw new Error("منوی موبایل پیدا نشد.");
  links.addEventListener("click", (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.tagName === "A") menu.open = false;
  });
}
