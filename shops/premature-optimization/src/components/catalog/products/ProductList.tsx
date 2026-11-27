import type { Product } from "../../../scripts/types.ts";
import { productDetails } from "../../../scripts/logic/catalog/product-details.ts";
import type { ProductDetailsSource } from "../../../scripts/logic/catalog/product-details.ts";
import ProductCard from "./ProductCard.tsx";

export type SharedCardProps = ProductDetailsSource;

type ProductListProps = SharedCardProps & { products: Product[] };

export default function ProductList({ products, ...shared }: ProductListProps) {
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          {...productDetails(product, shared)}
        />
      ))}
    </>
  );
}
