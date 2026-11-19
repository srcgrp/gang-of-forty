import { Link } from '@tanstack/react-router'

export default function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-content">
      <div className="hero-text">
        <span className="hero-label">فروشگاه Convention</span>
        <h1 id="hero-title">خرید روزانه، <strong>ساده و سریع</strong></h1>
        <p>محصولات مورد نیازت را با چند کلیک پیدا کن و خریدت را راحت انجام بده.</p>
        <Link to="/" hash="products" className="hero-button">مشاهده محصولات</Link>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-circle" />
        <div className="hero-products">🥛 🧀 🍪 🥤</div>
      </div>
    </div>
  </section>
}
