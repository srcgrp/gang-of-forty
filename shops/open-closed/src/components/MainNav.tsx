import { Link } from '@tanstack/react-router'
import JumpLink from './JumpLink.tsx'

export default function MainNav() {
  return (
    <nav className="main-nav" aria-label="منوی اصلی">
      <ul>
        <li className="all-cats">
          <Link className="all-link" to="/">☰ همه فهرست‌ها</Link>
          <ul className="cat-menu">
            <li>
              <Link to="/plp/$carouselId" params={{ carouselId: 'offers' }}>🔥 پیشنهاد ویژه</Link>
            </li>
            <li>
              <Link to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>🥛 لبنیات</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>لبنیات</Link>
        </li>
        <li><JumpLink to="contact">تماس با ما</JumpLink></li>
      </ul>
    </nav>
  )
}