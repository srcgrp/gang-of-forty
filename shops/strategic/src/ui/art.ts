/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

type HeroArt = readonly [name: string, alt: string, width: number, height: number];
type BannerArt = readonly [file: string, pattern: RegExp | null, width: number, height: number];

export const HERO_ART: HeroArt[] = [
  ['broccoli', 'کلم بروکلی', 560, 559],
  ['carrot', 'هویج', 357, 560],
  ['pepper', 'فلفل دلمه‌ای', 502, 560],
  ['tomato', 'گوجه‌فرنگی', 541, 560],
  ['orange', 'پرتقال تامسون', 560, 466],
  ['strawberry', 'توت‌فرنگی', 518, 560],
];

export const HERO_NAMES: Set<string> = new Set(HERO_ART.map(([name]) => name));

const BANNER_ART: BannerArt[] = [
  ['hero/breakfast-basket.webp', /صبحانه/, 1536, 1024],
  ['hero/hot-bread.webp', /نان|شیرینی/, 1536, 1024],
  ['hero/dairy.webp', /لبنیات|شیر|پنیر|ماست/, 560, 348],
];

export const FALLBACK_BANNER: BannerArt = ['hero/offer.webp', null, 1536, 1024];

export const findBannerArt = (text: string): BannerArt =>
  BANNER_ART.find(([, test]) => test !== null && test.test(text)) ?? FALLBACK_BANNER;