import { useParams } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { findProduct } from "../../scripts/logic/catalog/find-products.ts";
import { productDetails } from "../../scripts/logic/catalog/product-details.ts";
import ProductDetail from "../catalog/products/ProductDetail.tsx";
import Page from "../Page.tsx";
import NotFoundStatus from "../status/NotFoundStatus.tsx";

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { state, retry } = useCatalog();

  return (
    <Page state={state} onRetry={retry}>
      {(data) => {
        const product = findProduct(data.products, productId);
        if (product === null) {
          return <NotFoundStatus message="محصول پیدا نشد." />;
        }
        return (
          <ProductDetail product={product} {...productDetails(product, data)} />
        );
      }}
    </Page>
  );
}
