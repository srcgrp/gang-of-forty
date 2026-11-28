import Hero from "../Hero.tsx";
import Benefits from "../Benefits.tsx";
import CategoryNav from "../CategoryNav.tsx";
import CarouselRow from "../CarouselRow.tsx";
import Middle from "../Middle.tsx";
import Notification from "../Notification.tsx";
import Status from "../Status.tsx";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { useSearchStore } from "../../hooks/useSearchStore.ts";
import { OFFERS_CAROUSEL } from "../../catalog/carouselProducts.ts";

/*import { ALL_CAROUSEL } from "../../catalog/carouselProducts.ts";*/
export default function HomePage() {
  const { state, retry } = useCatalog();
  const query = useSearchStore((s) => s.query);

if (state.status !== "success") {
  return (
    <>
      <Status state={state} onRetry={retry} />
      <div id="cart-panel-root" />
    </>
  );
}

  return (
    <>
      <Hero />
      <Benefits />
      <CategoryNav categories={state.categories} />
      <CarouselRow data={state} carouselId={OFFERS_CAROUSEL} query={query} />
    {/*  <CarouselRow data={state} carouselId={ALL_CAROUSEL} query={query} />*/}
      <Middle />
      <CarouselRow data={state} carouselId="dairy" query={query} />
     <div id="cart-panel-root" />
      <Notification />
    </>
  );
}