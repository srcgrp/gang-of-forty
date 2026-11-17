import { useParams } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { carouselProducts } from "../../scripts/logic/carousel/carousel-products.ts";
import { carouselTitle } from "../../scripts/logic/carousel/find-carousel.ts";
import ProductListing from "../catalog/ProductListing.tsx";
import Page from "../Page.tsx";
import NotFoundStatus from "../status/NotFoundStatus.tsx";

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { state, retry } = useCatalog();

  return (
    <Page state={state} onRetry={retry}>
      {(data) => {
        const products = carouselProducts(data, carouselId);
        const title = carouselTitle(data, carouselId);
        if (products === null || title === null) {
          return <NotFoundStatus message="این فهرست پیدا نشد." />;
        }
        return (
          <ProductListing
            title={title}
            products={products}
            offers={data.offers}
            stock={data.stock}
            categories={data.categories}
          />
        );
      }}
    </Page>
  );
}
