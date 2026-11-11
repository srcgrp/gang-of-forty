import ProductCard from "./ProductCard";
export default function ProductGrid() {
  return (
    <section className="tents" id="tents">
      <h2 className="titles">محصولات نمونه</h2>
      <div className="carousel">
        <ProductCard />
      </div>
    </section>
  );
}
