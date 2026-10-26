/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { goBack, goToSection, navigate } from './app-route';
import type { Context } from './context';
import { dom } from './dom';

export function onLinkClick(ctx: Context, node: HTMLElement, event: MouseEvent): void {
  if (!(node instanceof HTMLAnchorElement)) return;
  const link = node;
  if (link.closest('.main-nav')) dom.menuToggle.checked = false;

  const plainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  if (!plainClick || link.target === '_blank') return;

  const href = link.getAttribute('href');
  if (!href) return;
  if (link.hasAttribute('data-back')) {
    event.preventDefault();
    goBack(ctx);
  } else if (link.hasAttribute('data-route')) {
    event.preventDefault();
    void navigate(ctx, href);
  } else if (href.startsWith('#') && href.length > 1 && !link.classList.contains('skip')) {
    const section = document.getElementById(decodeURIComponent(href.slice(1)));
    if (section) {
      event.preventDefault();
      goToSection(ctx, href, section);
    } else if (ctx.ports.readRoute().type !== 'home') {
      event.preventDefault();
      void navigate(ctx, ctx.ports.homePath() + href);
    }
  }
}