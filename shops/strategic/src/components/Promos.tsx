import type { Promo } from '../types';
import { bannerArt, safeHref, stripEmoji } from './shop-content';

export default function Promos({ promos }: { promos: readonly Promo[] }) {
  if (!promos.length) return null;
  return (
    <section className="banners" aria-label="پیشنهادهای تبلیغاتی">
      {promos.map(promo => {
        const [art, width, height] = bannerArt(promo.text);
        return <a className="banner" key={promo.href + promo.text} href={safeHref(promo.href)}>
          {stripEmoji(promo.text)}
          <img src={`./assets/images/hero/${art}.webp`} alt="" width={width} height={height} loading="lazy" decoding="async" />
        </a>;
      })}
    </section>
  );
}
