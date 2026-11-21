import type { ShopModel } from '../types';
import { heroTag } from '../features/products/hero-tag';
import { bannerArt, safeHref, stripEmoji } from './shop-content';

export default function Hero({ model }: { model: ShopModel }) {
  const { hero, side } = model.home;
  const offers = model.carousels.find(section => section.source === 'offers');
  const tag = heroTag(model.offerItems);
  const [art, width, height] = bannerArt(side.title + ' ' + side.text);
  return (
    <section className="hero" aria-label="پیشنهاد اصلی">
      <div className="hero__feature">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__brand">سوپرمارکت آرمین،</span>
            <span className="hero__headline">{stripEmoji(hero.title)}</span>
          </h1>
          <p className="hero__lead">{stripEmoji(hero.text)}</p>
          <div className="hero__actions">
            {hero.cta && <a className="btn" href={safeHref(hero.cta.href)}>{stripEmoji(hero.cta.label)}</a>}
            {offers && <a className="btn btn--outline" href={`#${offers.id}`}>{stripEmoji(offers.title)}</a>}
          </div>
        </div>
        <div className="hero__stage">
          <span className="hero__disc" aria-hidden="true" />
          <img className="hero__item hero__item--broccoli" src="./assets/images/hero/broccoli.webp" alt="کلم بروکلی" width="560" height="559" decoding="async" />
          <img className="hero__item hero__item--carrot" src="./assets/images/hero/carrot.webp" alt="هویج" width="357" height="560" decoding="async" />
          <img className="hero__item hero__item--pepper" src="./assets/images/hero/pepper.webp" alt="فلفل دلمه‌ای" width="502" height="560" decoding="async" />
          <img className="hero__item hero__item--tomato" src="./assets/images/hero/tomato.webp" alt="گوجه‌فرنگی" width="541" height="560" fetchPriority="high" decoding="async" />
          <img className="hero__item hero__item--orange" src="./assets/images/hero/orange.webp" alt="پرتقال تامسون" width="560" height="466" decoding="async" />
          <img className="hero__item hero__item--strawberry" src="./assets/images/hero/strawberry.webp" alt="توت‌فرنگی" width="518" height="560" decoding="async" />
          {tag && <a className="hero__tag" href={offers ? `#${offers.id}` : '#categories'}>
            <span className="hero__tag-name">{tag.product.name}، {tag.product.unit}</span>
            <span className="hero__tag-row">
              <del><span className="sr-only">قیمت قبلی: </span>{tag.oldPrice.toLocaleString('fa-IR')}</del>
              <strong>{tag.price.toLocaleString('fa-IR')} تومان</strong>
              <span className="hero__tag-off">{tag.percent.toLocaleString('fa-IR')}٪<span className="sr-only"> تخفیف</span></span>
            </span>
          </a>}
        </div>
      </div>
      <div className="hero__promo">
        <div className="hero__promo-copy">
          <h2 className="hero__promo-title">{stripEmoji(side.title)}</h2>
          <p className="hero__promo-note">{stripEmoji(side.text)}</p>
          {side.cta && <a className="btn btn--green" href={safeHref(side.cta.href)}>{stripEmoji(side.cta.label)}</a>}
        </div>
        <img className="hero__promo-art" src={`./assets/images/hero/${art}.webp`} alt="" width={width} height={height} decoding="async" />
      </div>
    </section>
  );
}