/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

const numberFa = new Intl.NumberFormat('fa-IR');

export const formatNumber = (value: number): string => numberFa.format(value);

export const formatPrice = (value: number): string => `${numberFa.format(value)} تومان`;

export const toFaDigits = (value: string | number): string =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)] ?? digit);