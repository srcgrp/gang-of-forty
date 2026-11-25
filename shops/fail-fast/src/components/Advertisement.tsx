import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import banner07Img from '../images/banner07.webp'
import banner08Img from '../images/banner08.webp'

export default function Advertisement(): ReactNode {
  return (
    <section className="advertisment">
      <Link to="." hash="top">
        <img
          src={banner07Img}
          className="advertisment-banner"
          alt="بنر تبلیغاتی مزمز"
        />
      </Link>
      <Link to="." hash="top">
        <img
          src={banner08Img}
          className="advertisment-banner"
          alt="بنر تبلیغاتی رانی"
        />
      </Link>
    </section>
  )
}
