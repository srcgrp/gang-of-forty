import heroImage from '../../assets/banners/Hero-image.png'

export default function Hero() {
  return (
    <section className="hero">
      <img className="hero-bg" src={heroImage} alt="محصولات MARTO" />

      <div className="hero-content">
        <h1>
          محصولات تازه
          <br />
          برای زندگی بهتر
        </h1>
        <p>کیفیت، تنوع و خرید آسان برای زندگی روزمره شما</p>
        <button type="button">مشاهده محصولات</button>
      </div>
    </section>
  )
}