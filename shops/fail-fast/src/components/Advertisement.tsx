import type { ReactNode } from 'react'
import banner07Img from '../images/banner07.webp'
import banner08Img from '../images/banner08.webp'

export default function Advertisement(): ReactNode {
  return (
    <section className="advertisment">
      <a href="#top">
        <img
          src={banner07Img}
          className="advertisment-banner"
          alt="بنر تبلیغاتی مزمز"
        />
      </a>
      <a href="#top">
        <img
          src={banner08Img}
          className="advertisment-banner"
          alt="بنر تبلیغاتی رانی"
        />
      </a>
    </section>
  )
}
