export function showMessage(
  container: HTMLDivElement,
  text: string,
): HTMLParagraphElement {
  const message = document.createElement("p");
  message.classList.add("carousel-message");
  message.textContent = text;
  container.append(message);
  return message;
}
export const textmsg = "در حال بارگذاری...";