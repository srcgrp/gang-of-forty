import type { StoreData } from "../features/products/api/store-data";
import { getSearchedSections } from "../features/products/logic/search-sections";
import ProductGrid from "./ProductGrid";

type Props = {
  data: StoreData;
  categoryId: number | null;
  query: string;
  onAdd: (id: number) => void;
};

export default function ProductSections({
  data,
  categoryId,
  query,
  onAdd,
}: Props) {
  const sections = getSearchedSections(data, categoryId, query);

  return (
    <div id="products">
      {sections.length === 0 ? (
        <p className="empty-message">
          محصولی مطابق جستجو یا دسته‌بندی پیدا نشد.
        </p>
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
