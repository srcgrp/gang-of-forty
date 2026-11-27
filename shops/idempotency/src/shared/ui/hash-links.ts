export function getInPageHash(target: EventTarget): string | null {
  if (!(target instanceof Element)) return null;

  const href = target.closest("a")?.getAttribute("href");

  return href?.startsWith("#") && !href.startsWith("#/")
    ? href.slice(1)
    : null;
}

export function scrollToHash(id: string): boolean {
  if (id === "" || id === "top") {
    window.scrollTo({ top: 0 });
    return true;
  }

  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView();
  element.classList.add("is-targeted");
  window.setTimeout(() => element.classList.remove("is-targeted"), 1800);
  return true;
}
