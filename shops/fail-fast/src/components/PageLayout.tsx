import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useThemeStore } from '../hooks/useThemeStore'
import Footer from './Footer'

interface PageLayoutProps {
  header: ReactNode
  mainContent: ReactNode
  showFooter: boolean
}

export default function PageLayout({
  header,
  mainContent,
  showFooter,
}: PageLayoutProps): ReactNode {
  const theme = useThemeStore((state) => state.theme)
  const mainRef = useRef<HTMLElement>(null)

  return (
    <div className="app" data-theme={theme}>
      <div id="top"></div>
      <Link
        to="."
        hash="main"
        className="skip"
        onClick={() => mainRef.current?.focus()}
      >
        پرش به محتوای اصلی
      </Link>
      {header}
      <main id="main" ref={mainRef} tabIndex={-1}>{mainContent}</main>
      {showFooter && <Footer />}
    </div>
  )
}
