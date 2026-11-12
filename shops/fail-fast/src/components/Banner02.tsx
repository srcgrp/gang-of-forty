import type { ReactNode } from 'react'
import banner05Img from '../images/banner05.webp'
import banner02ResImg from '../images/banner-02-res.webp'

export default function Banner02(): ReactNode {
  return (
    <>
      <section className="banner02" id="sales">
        <img src={banner05Img} alt="تخفیفهای اسپیس مارکت" />
      </section>
      <section className="banner02-res">
        <img src={banner02ResImg} alt="تخفیفهای اسپیس مارکت" />
      </section>
    </>
  )
}
