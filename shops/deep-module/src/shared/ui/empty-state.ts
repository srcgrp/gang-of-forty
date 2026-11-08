import { h } from "./dom";

export interface EmptyOptions {
  title?: string;
  text?: string;
  icon?: string;
}

export function renderEmpty(
  container: HTMLElement | null,
  options: EmptyOptions = {},
): void {
  if (!container) return;
  const {
    title = "چیزی برای نمایش نیست",
    text = "به‌زودی محصولات جدید اضافه می‌شود.",
    icon = "📭",
  } = options;

  const li = h("li", "state-empty");
  const iconEl = h("div", "state-empty__icon", icon);
  iconEl.setAttribute("aria-hidden", "true");

  li.append(
    iconEl,
    h("h3", "state-empty__title", title),
    h("p", "state-empty__text", text),
  );
  container.replaceChildren(li);
}
