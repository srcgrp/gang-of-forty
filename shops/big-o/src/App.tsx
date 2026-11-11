import Ads from "./components/Ads";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Ads />
      </main>
      <Footer />
    </>
    
  )
}