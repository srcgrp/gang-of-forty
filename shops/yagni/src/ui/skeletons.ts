export function renderProductSkeletons(container: HTMLElement, count = 6): void {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const card = document.createElement('div'); card.className = 'product-skeleton'; card.setAttribute('aria-hidden', 'true');
    const thumb = document.createElement('div'); thumb.className = 'product-skeleton__thumb product-skeleton__shimmer';
    const info = document.createElement('div'); info.className = 'product-skeleton__info';
    const name = document.createElement('div'); name.className = 'product-skeleton__shimmer product-skeleton__name';
    const unit = document.createElement('div'); unit.className = 'product-skeleton__shimmer product-skeleton__unit'; info.append(name, unit);
    const footer = document.createElement('div'); footer.className = 'product-skeleton__footer';
    const pricing = document.createElement('div'); pricing.className = 'product-skeleton__pricing product-skeleton__shimmer';
    const button = document.createElement('div'); button.className = 'product-skeleton__shimmer product-skeleton__button'; footer.append(pricing, button);
    card.append(thumb, info, footer); fragment.append(card);
  }
  container.replaceChildren(fragment);
}
export function renderCategorySkeletons(container: HTMLElement, count = 7): void {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) { const card = document.createElement('div'); card.className = 'category-skeleton'; card.setAttribute('aria-hidden', 'true'); const image = document.createElement('div'); image.className = 'category-skeleton__shimmer category-skeleton__image'; const title = document.createElement('div'); title.className = 'category-skeleton__shimmer category-skeleton__title'; card.append(image, title); fragment.append(card); }
  container.replaceChildren(fragment);
}
