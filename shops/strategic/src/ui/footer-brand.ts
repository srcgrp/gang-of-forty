/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { BRAND } from './brand';
import { dom } from './dom';
import { el } from './el';
import { icon } from './media';

const contactLink = (href: string, iconName: string, label: string, text: string): HTMLAnchorElement =>
  el('a', { href }, [
    icon(iconName), ' ',
    el('span', { class: 'sr-only', text: label }),
    el('bdi', { dir: 'ltr', text }),
  ]);

export function renderFooterBrand(): void {
  const { footer } = dom;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`;

  footer.contact.replaceChildren(
    el('a', { href: mapsUrl, target: '_blank', rel: 'noopener noreferrer' }, [
      icon('pin'),
      ` ${BRAND.address}`,
      el('span', { class: 'sr-only', text: ' (نمایش در گوگل مپ، در تب جدید باز می‌شود)' }),
    ]),
    ...BRAND.phones.map((phone) => contactLink(`tel:${phone.tel}`, phone.icon, `${phone.label}: `, phone.text)),
    contactLink(`mailto:${BRAND.email}`, 'mail', 'ایمیل: ', BRAND.email),
  );

  footer.social.replaceChildren(...BRAND.social.map((net) =>
    el('li', {}, [el('a', { href: net.href }, [icon(net.icon), ` ${net.label}`])])));

  footer.copy.textContent = BRAND.copyright;
}