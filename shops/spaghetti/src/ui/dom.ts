// src/ui/dom.ts

const priceFormatter = new Intl.NumberFormat('fa-IR');

export function formatPrice(number: number): string {
    return priceFormatter.format(Math.round(number));
}

export function createEl<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className = '',
    textContent = ''
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent !== '') el.textContent = textContent;
    return el;
}

export function createPlusIcon(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '12');
    line1.setAttribute('y1', '5');
    line1.setAttribute('x2', '12');
    line1.setAttribute('y2', '19');

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '5');
    line2.setAttribute('y1', '12');
    line2.setAttribute('x2', '19');
    line2.setAttribute('y2', '12');

    svg.appendChild(line1);
    svg.appendChild(line2);
    return svg;
}

export function renderError(container: HTMLElement | null, message: string): void {
    if (!container) return;
    container.innerHTML = '';
    const errorBox = createEl('div', 'error-notice', message);
    errorBox.style.padding = '25px';
    errorBox.style.textAlign = 'center';
    errorBox.style.color = '#dc2626';
    errorBox.style.width = '100%';
    container.appendChild(errorBox);
}
