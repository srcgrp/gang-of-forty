import ProductSkeletons from "./ProductSkeletons";

const sections = [
  { id: "offers", title: "پیشنهاد ویژه امروز", count: 10 },
  { id: "dairy", title: "لبنیات", count: 6 },
  { id: "fruits", title: "میوه و سبزی", count: 7 },
  { id: "bakery", title: "نان و شیرینی", count: 6 },
  { id: "pantry", title: "خواربار", count: 6 },
  { id: "drinks", title: "نوشیدنی", count: 6 },
  { id: "proteins", title: "پروتئین", count: 6 },
  { id: "snacks", title: "تنقلات", count: 6 },
];

export default function LoadingProductSections() {
  return (
    <div
      id="products"
      role="status"
      aria-busy="true"
      aria-label="در حال دریافت محصولات فروشگاه"
    >
      {sections.map((section) => (
        <section
          key={section.id}
          className="product-section home-carousel-section"
        >
          <ProductSkeletons title={section.title} count={section.count} />
        </section>
      ))}
    </div>
  );
}
