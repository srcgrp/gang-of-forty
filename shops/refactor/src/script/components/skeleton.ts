
import { el } from '../utils/utils.js';



type MessageRole = 'status' | 'alert';

const isEdge = (node: Element): boolean => node.classList.contains('track-edge');

const setBusy = (container: HTMLElement, busy: boolean): void => {
    container.setAttribute('aria-busy', String(busy));
};

const fillContainer = (container: HTMLElement, nodes: Node[]): void => {
    Array.from(container.children)
        .filter((child) => !isEdge(child))
        .forEach((child) => child.remove());

    const end = container.querySelector<HTMLElement>(':scope > [data-edge="end"]');

    if (end) {
        end.before(...nodes);
    } else {
        container.append(...nodes);
    }
};

const showError = (
    container: HTMLElement,
    msg: string,
    role: MessageRole = 'status'
): void => {
    const item = el(container.matches('ul, ol') ? 'li' : 'p', 'error-msg', msg);
    item.setAttribute('role', role);

    fillContainer(container, [item]);
    setBusy(container, false);
};

const showLoading = (container: HTMLElement): void => {
    showError(container, 'در حال بارگیری ...');
    setBusy(container, true);
};

const makeSkeleton = (): HTMLLIElement => {
    const li = el('li', 'card skeleton');
    li.setAttribute('aria-hidden', 'true');

    const top = el('div', 'card-top');
    const media = el('div', 'sk-media');
    const body = el('div', 'card-body');
    const line1 = el('div', 'sk-line');
    const line2 = el('div', 'sk-line sk-line--short');

    body.append(line1, line2);
    li.append(top, media, body);

    return li;
};

const renderSkeletons = (container: HTMLElement, count: number = 8): void => {
    fillContainer(container, Array.from({ length: count }, makeSkeleton));
    setBusy(container, true);
};

export { showError, showLoading, renderSkeletons, fillContainer, setBusy };
