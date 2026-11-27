export function setupCategoryFilter(
  onSelect: (slug: string | null) => void,
): void {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>(
      'a[data-category-slug], a[href="#categories"]',
    );
    if (!link) return;

    event.preventDefault();
    const slug = link.dataset.categorySlug ?? null;
    onSelect(slug);

    const target = slug ? "home-category-carousels" : "categories";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  });
}

export function updateSelectedCategory(slug: string | null): void {
  document.querySelectorAll<HTMLAnchorElement>("a[data-category-slug]")
    .forEach((link) => {
      if (link.dataset.categorySlug === slug) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
}
