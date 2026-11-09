import Header from "./components/Header"
import Hero from "./components/Hero"
import Benefits from "./components/Benefits"
import CategoryNav from "./components/CategoryNave"
import Footer from "./components/Footer"
import Middle from "./components/Middle"
import Navigation from "./components/Navigation"
import Notification from "./components/Notification"
import ProductGrid from "./components/ProductGrid"

export default function App() {
  return (
  
    <>
      <Header />

      <Navigation />

      <main className="site-main">
        <Hero />

        <Benefits />

        <CategoryNav />

        <ProductGrid
          title="پرفروش‌های امروز"
          id="special-offer"
        />

        <Middle />

        <ProductGrid
          title="در حال بارگذاری..."
          id="special-offer-nuts"
          nuts
        />

        <Notification />
      </main>

      <Footer />
    </>
)
}