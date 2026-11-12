export const stripEmoji = (text: string): string =>
  text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s+/g, ' ').trim();

export function safeHref(href: string): string {
  try {
    const url = new URL(href, document.baseURI);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? href : '#';
  } catch {
    return '#';
  }
}

export function bannerArt(text: string): [string, number, number] {
  if (/صبحانه/.test(text)) return ['breakfast-basket', 1536, 1024];
  if (/نان|شیرینی/.test(text)) return ['hot-bread', 1536, 1024];
  if (/لبنیات|شیر|پنیر|ماست/.test(text)) return ['dairy', 560, 348];
  return ['offer', 1536, 1024];
}
