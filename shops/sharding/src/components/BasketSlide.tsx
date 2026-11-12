export default function BasketSlide() {
  return (
    <li className="hero-carousel__slide" data-variant="basket" data-state="active">
      <a className="hero-banner hero-banner--basket" href="#fruits">
        <div className="hero-carousel__basket-wrap" aria-hidden="true">
          <img
            className="hero-carousel__fruits"
            src={`${import.meta.env.BASE_URL}assets/images/promos/fruits.webp`}
            alt=""
            loading="eager"
          />
          <img
            className="hero-carousel__basket"
            src={`${import.meta.env.BASE_URL}assets/images/promos/basket.webp`}
            alt=""
            loading="eager"
          />
        </div>
        <div className="hero-carousel__basket-content">
          <span className="hero-carousel__basket-eyebrow">✦ تازه از مزرعه</span>
          <h3 className="hero-carousel__basket-title">
            پیشنهادهای ویژه هفته
            <span className="hero-carousel__basket-arrow" aria-hidden="true">←</span>
          </h3>
        </div>
      </a>
    </li>
  )
}