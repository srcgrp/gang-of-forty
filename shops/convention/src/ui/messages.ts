export function showMessage(
    container: HTMLElement,
    message: string
): void {
    const messageElement = document.createElement("p");
    messageElement.className = "carousel-message";
    messageElement.textContent = message;
    container.replaceChildren(messageElement);
}