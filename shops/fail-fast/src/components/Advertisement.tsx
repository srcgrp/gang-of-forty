import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import banner07Img from '../images/banner07.webp'
import banner08Img from '../images/banner08.webp'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Advertisement(): ReactNode {
  const revealRef = useScrollReveal<HTMLElement>()
  return (
    <section ref={revealRef} className="advertisment scroll-reveal">
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
