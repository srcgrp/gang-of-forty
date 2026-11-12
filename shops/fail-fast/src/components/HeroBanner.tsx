import type { ReactNode } from 'react'
import bannerImg from '../images/banner01.webp'

export default function HeroBanner(): ReactNode {
  return (
    <div className="banner01">
      <img
        id="banner01"
        src={bannerImg}
        alt="بنر اسپیس مارکت"
        width="1920"
        height="600"
      />
      <h1 className="banner01-content">
        تازه، سریع، <span>از خود فضا!</span>
      </h1>
      <p className="banner01-sub">
        خرید روزانه با طعم یک ماجراجویی فضایی
      </p>
    </div>
  )
}
