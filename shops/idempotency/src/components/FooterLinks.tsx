import type { Category } from "../shared/types/products";
import type { Shop } from "../shared/types/shop";

type Props = {
  categories: Category[];
  help: Shop["help"];
  onPickCategory: (id: number | null) => void;
};

export default function FooterLinks({
  categories,
  help,
  onPickCategory,
}: Props) {
  return (
    <>
      <section className="footer-section">
        <h2 className="footer-title">دسته‌بندی‌ها</h2>
        <nav aria-label="دسته‌بندی‌های فوتر">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.slug}`}
              onClick={() => onPickCategory(category.id)}
            >
              {category.name}
            </a>
          ))}
          {categories.length === 0 && <a href="#categories">دسته‌بندی‌ها</a>}
        </nav>
      </section>

      <section className="footer-section">
        <h2 className="footer-title">راهنمای مشتریان</h2>
        <nav aria-label="راهنمای مشتریان">
          {help.length > 0 ? (
            help.map((item) => (
              <a key={`${item.href}-${item.label}`} href={item.href}>
                {item.label}
              </a>
            ))
          ) : (
            <>
              <a href="#about">درباره ما</a>
              <a href="#contact">تماس با ما</a>
            </>
          )}
        </nav>
      </section>
    </>
  );
}
