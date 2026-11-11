import type { PageView, Category } from "../shared/types";
import ProductGrid from "./ProductGrid";

type Props = { page: PageView; category: Category | undefined; onAdd: (id: number) => void };
export default function ProductSections({ page, category, onAdd }: Props) {
  const sections = category ? page.sections.filter(section => section.id === category.slug) : page.sections;
  return (
    <>
      <div id="carousels">
        {sections.filter(section => section.carousel).map(section => (
          <ProductGrid key={section.id} section={section} onAdd={onAdd} />
        ))}
      </div>
      <div id="category-products">
        {sections.filter(section => !section.carousel).map(section => (
          <ProductGrid key={section.id} section={section} onAdd={onAdd} />
        ))}
      </div>
    </>
  );
}
