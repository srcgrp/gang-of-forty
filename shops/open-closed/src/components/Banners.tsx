import { Link } from '@tanstack/react-router'
export default function Banners() {
  return (
    <section className="section banners" aria-label="پیشنهادها">
      <Link className="banner banner-rose" to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>
        <span>سبد صبحانه خانواده</span>
        <span className="banner-art" aria-hidden="true">🍳</span>
      </Link>
      <Link className="banner banner-rose" to="/">
        <span>نان داغ، هر روز ساعت ۷</span>
        <span className="banner-art" aria-hidden="true">🥐</span>
      </Link>
    </section>
  )
}
