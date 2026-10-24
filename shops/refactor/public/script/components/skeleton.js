import { el } from '../utils/utils.js';

const showError = (track, msg) => {
    track.textContent = '';
    track.appendChild(el('li', 'error-msg', msg));
};

const makeSkeleton = () => {
    const li = el('li', 'card skeleton');
    const top = el('div', 'card-top');
    const media = el('div', 'sk-media');
    const body = el('div', 'card-body');
    const line1 = el('div', 'sk-line');
    const line2 = el('div', 'sk-line sk-line--short');
    body.append(line1, line2);
    li.append(top, media, body);
    return li;
};

const renderSkeletons = (container, count = 4) =>
    container.append(
        ...Array.from({ length: count }, () => makeSkeleton())
    );

export { showError, renderSkeletons };