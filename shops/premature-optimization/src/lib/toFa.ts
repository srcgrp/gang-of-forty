const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toFaDigits(text: string): string {
  return text.replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}
