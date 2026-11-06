import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import LogoSprite from './components/LogoSprite.tsx'

export default function App() {
    return (
        <>
      <LogoSprite />
      <Header />
      <CategoryNav />
      <main id="main">
        <Hero />
      </main>
      <Footer />
        </>
    )
}