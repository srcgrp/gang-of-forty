import type { ReactNode } from 'react'
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

  return (
    <div className="app" data-theme={theme}>
      <div id="top"></div>
      <a href="#main" className="skip">پرش به محتوای اصلی</a>
      {header}
      <main id="main">{mainContent}</main>
      {showFooter && <Footer />}
    </div>
  )
}
