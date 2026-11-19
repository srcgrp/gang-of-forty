import type { ReactNode } from 'react'

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
  return (
    <>
      <div id="top"></div>
      <a href="#main" className="skip">پرش به محتوای اصلی</a>
      {header}
      <main id="main">{mainContent}</main>
      {showFooter && <Footer />}
    </>
  )
}

import Footer from './Footer'
