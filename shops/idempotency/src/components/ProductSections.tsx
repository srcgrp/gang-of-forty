import type { StoreData } from "../features/products/api/store-data";
import { getHomeSections } from "../features/products/logic/home-sections";
import ProductGrid from "./ProductGrid";

type Props = {
  data: StoreData;
  categoryId: number | null;
  onAdd: (id: number) => void;
};

export default function ProductSections({ data, categoryId, onAdd }: Props) {
  const sections = getHomeSections(data, categoryId);

  return (
    <div id="products">
      {sections.length === 0 ? (
        <p className="empty-message">محصولی در این دسته‌بندی وجود ندارد.</p>
      ) : (
        sections.map((section) => (
          <ProductGrid
            key={section.id}
            sectionId={section.id}
            title={section.title}
            products={section.products}
            offers={data.offers}
            stock={data.stock}
            onAdd={onAdd}
          />
        ))
      )}
    </div>
  );
}
