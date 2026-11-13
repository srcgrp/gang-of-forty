export default function Hero() {
  return (
    <div id="top" className="hero-grid">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">لبنیات تازه، هر روز صبح</h1>
        <p>شیر، ماست و پنیر تازه تا دو ساعت بعد دم در خانه شما.</p>
        <a className="btn" href="#dairy">خرید لبنیات</a>
        <span className="hero-art" aria-hidden="true">🥛</span>
      </section>
      <aside className="promo" aria-labelledby="promo-title">
        <h2 id="promo-title">تا ۲۰٪ تخفیف لبنیات</h2>
        <p>فقط تا پایان هفته</p>
        <span className="promo-art" aria-hidden="true">🧀</span>
        <a className="btn btn-yellow" href="#dairy">دیدن محصولات</a>
      </aside>
    </div>
  )
}
