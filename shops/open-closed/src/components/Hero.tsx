import { Link } from '@tanstack/react-router'
export default function Hero() {
  return (
    <div className="hero-grid">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">لبنیات تازه، هر روز صبح</h1>
        <p>شیر، ماست و پنیر تازه تا دو ساعت بعد دم در خانه شما.</p>
        <Link className="btn" to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>خرید لبنیات</Link>
        <span className="hero-art" aria-hidden="true">🥛</span>
      </section>
      <aside className="promo" aria-labelledby="promo-title">
        <h2 id="promo-title">تا ۲۰٪ تخفیف لبنیات</h2>
        <p>فقط تا پایان هفته</p>
        <span className="promo-art" aria-hidden="true">🧀</span>
        <Link className="btn btn-yellow" to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>دیدن محصولات</Link>
      </aside>
    </div>
  )
}
