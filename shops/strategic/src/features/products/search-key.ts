/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

export const searchKey = (value: unknown): string =>
  String(value ?? '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[\u200c\u200d\u200e\u200f]/g, ' ')
    .replace(/[\u064b-\u065f\u0670]/g, '')
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();