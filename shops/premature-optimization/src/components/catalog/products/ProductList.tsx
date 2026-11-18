import type {
  Product,
  Category,
  Offer,
  Stock,
} from "../../../scripts/types.ts";
import ProductCard from "./ProductCard.tsx";
import { productDetails } from "../../../scripts/logic/catalog/product-details.ts";

export type SharedCardProps = {
  offers: Offer[];
  stock: Stock;
  categories: Category[];
};

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
