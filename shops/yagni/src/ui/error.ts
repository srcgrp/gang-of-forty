export function renderError(
  container: HTMLElement,
  messageText: string,
  retry: () => void,
): void {
  const wrapper = document.createElement("div");
  wrapper.className = "product-error";
  const icon = document.createElement("span");
  icon.className = "product-error__icon";
  icon.textContent = "⚠️";
  icon.setAttribute("aria-hidden", "true");
  const message = document.createElement("p");
  message.className = "product-error__message";
  message.textContent = messageText;
  const button = document.createElement("button");
  button.className = "product-error__retry";
  button.type = "button";
  button.textContent = "تلاش مجدد";
  button.addEventListener("click", retry);
  wrapper.append(icon, message, button);
  container.replaceChildren(wrapper);
}
export function renderEmpty(
  container: HTMLElement,
  messageText = "محصولی برای نمایش وجود ندارد",
): void {
  const message = document.createElement("p");
  message.className = "product-empty";
  message.textContent = messageText;
  container.replaceChildren(message);
}
