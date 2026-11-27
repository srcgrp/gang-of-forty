import { h } from '../../../shared/ui/dom';
import { createIcon } from '../../../shared/ui/icons';

export function renderStatus(id: string, title: string, message: string, isError: boolean): void {
  const grid = document.getElementById(`${id}-grid`);
  const status = document.getElementById(`${id}-status`);
  if (!grid || !status) return;

  grid.hidden = true;
  grid.replaceChildren();
  grid.removeAttribute('aria-busy');

  status.hidden = false;
  status.className = 'product-shelf__status';
  status.dataset.variant = isError ? 'error' : 'empty';
  status.replaceChildren();

  const iconWrap = h('span', { className: 'product-shelf__status-icon' });
  iconWrap.appendChild(createIcon(isError ? 'warning' : 'empty'));
  iconWrap.setAttribute('aria-hidden', 'true');

  status.append(
    iconWrap,
    h('p', { className: 'product-shelf__status-title', textContent: title }),
    h('p', { className: 'product-shelf__status-text', textContent: message })
  );

  if (isError) {
    const retry = h('button', { type: 'button', className: 'product-shelf__status-retry', textContent: 'تلاش دوباره' });
    retry.addEventListener('click', () => location.reload());
    status.appendChild(retry);
  }
}