
type MakeButtonOptions = {
  className?: string;
  iconId: string;
  label: string;
  text?: string;
  type?: HTMLButtonElement['type'];
}

const el = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  className?: string | null,
  text?: string
): HTMLElementTagNameMap[T] => {
  const node = document.createElement(tag);

  if (className) {
    node.className = className;
  }

  if (text !== undefined) {
    node.textContent = text;
  }

  return node;
};

const makeIcon = (
  id: string,
  className = 'icon'
): SVGSVGElement => {
  const namespace = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(namespace, 'svg');
  const use = document.createElementNS(namespace, 'use');

  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  use.setAttribute('href', `#${id}`);
  svg.append(use);

  return svg;
};

const makeButton = ({
    className,
    label,
    iconId,
    text,
    type = 'button',
}: MakeButtonOptions): HTMLButtonElement => {
    const button = el('button', className);
    button.type = type;
    button.setAttribute('aria-label', label);
    button.append(makeIcon(iconId));

    if (text !== undefined) {
        button.append(el('span', null, text));
    }

    return button;
};
const saveToLocalStorage = (count: number): void => {
  localStorage.setItem("count", String((count)));
};

const getCountBasketFromLocalStorage = (): number => {
  try {
    return Number(localStorage.getItem('count')) || 0;
  } catch {
    return 0;
  }
};

export {
  el,
  makeIcon,
  makeButton,
  saveToLocalStorage,
  getCountBasketFromLocalStorage,
};

export type { MakeButtonOptions };
