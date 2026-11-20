/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

export const stripEmoji = (text: unknown): string =>
  String(text ?? '').replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s+/g, ' ').trim();

export function safeHref(href: string | null | undefined): string {
  if (!href) return '#';
  try {
    const { protocol } = new URL(href, document.baseURI);
    return [new URL(document.baseURI).protocol, 'http:', 'https:', 'mailto:', 'tel:'].includes(protocol) ? href : '#';
  } catch {
    return '#';
  }
}

export const safeColor = (value: unknown): string | null =>
  typeof value === 'string' && /^#[0-9a-f]{3,8}$/i.test(value) ? value : null;