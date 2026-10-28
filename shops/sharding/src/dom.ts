export type ElementProps<K extends keyof HTMLElementTagNameMap> =
  Partial<HTMLElementTagNameMap[K]> & { dataset?: Record<string, string> };

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: ElementProps<K> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  const { dataset, ...rest } = props;
  Object.assign(el, rest);
  if (dataset) for (const [k, v] of Object.entries(dataset)) el.dataset[k] = v;
  for (const child of children) {
    el.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return el;
}

export function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.classList.remove(
    'skeleton-text',
    'skeleton-text--brand',
    'skeleton-text--tagline',
    'skeleton-text--action',
    'skeleton-text--dept',
    'skeleton-text--mobile-title',
    'skeleton-text--section-title',
    'skeleton-text--footer-title',
    'skeleton-text--about',
    'skeleton-text--copy',
    'skeleton-text--footer-top',
    'skeleton-text--topbar',
  );
  el.removeAttribute('aria-hidden');
}

export function mkBtn(
  className: string,
  label: string,
  action?: 'inc' | 'dec',
  text?: string,
): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = className;
  if (action) btn.dataset.action = action;
  btn.setAttribute('aria-label', label);
  if (text !== undefined) btn.textContent = text;
  return btn;
}

export function makeEmoji(emoji: string, extraClass?: string): HTMLSpanElement {
  const span = h('span', {
    className: extraClass ? `product__emoji ${extraClass}` : 'product__emoji',
    textContent: emoji || '🛒',
  });
  span.setAttribute('aria-hidden', 'true');
  return span;
}

export function createSvgIcon(pathD: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  svg.appendChild(path);
  return svg;
}

export function cloneIcon(templateId: string): Node | null {
  const tpl = document.querySelector<HTMLTemplateElement>(`#${templateId}`);
  return tpl ? tpl.content.cloneNode(true) : null;
}

export function cloneTemplate(id: string): DocumentFragment | null {
  const tpl = document.querySelector<HTMLTemplateElement>(`#${id}`);
  if (!tpl) return null;
  const node = tpl.content.cloneNode(true);
  return node instanceof DocumentFragment ? node : null;
}

export function fillFromTemplate(
  containerId: string,
  templateId: string,
  count: number,
): void {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.replaceChildren();
  for (let i = 0; i < count; i++) {
    const frag = cloneTemplate(templateId);
    if (!frag) continue;
    for (const node of Array.from(frag.children)) {
      if (node instanceof HTMLElement) {
        node.style.setProperty('--i', String(i));
      }
    }
    el.appendChild(frag);
  }
}

export function renderImageOrEmoji(
  wrap: HTMLElement,
  src: string | undefined,
  alt: string,
  emoji: string,
  opts: {
    plateClass?: string;
    emojiClass?: string;
    width?: number;
    height?: number;
  } = {},
): void {
  wrap.replaceChildren();
  if (src) {
    const img = h('img', {
      src,
      alt,
      loading: 'lazy',
      decoding: 'async',
      ...(opts.width != null ? { width: opts.width } : {}),
      ...(opts.height != null ? { height: opts.height } : {}),
    });
    img.onerror = () => {
      img.remove();
      if (opts.plateClass) wrap.classList.add(opts.plateClass);
      wrap.appendChild(makeEmoji(emoji, opts.emojiClass));
    };
    wrap.appendChild(img);
    return;
  }
  if (opts.plateClass) wrap.classList.add(opts.plateClass);
  wrap.appendChild(makeEmoji(emoji, opts.emojiClass));
}