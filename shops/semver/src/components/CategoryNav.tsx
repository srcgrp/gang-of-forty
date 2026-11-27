import type { Category, ShopLink } from '../types';
import StoreLink from './StoreLink';

type CategoryNavProps = {
  categories: Category[];
  activeCategoryId: number | null;
  onPick: (categoryId: number | null) => void;
  menu: ShopLink[];
};

export default function CategoryNav({
  categories,
  activeCategoryId,
  onPick,
  menu,
}: CategoryNavProps) {
  const categoryHrefs = new Set(categories.map(({ slug }) => `#${slug}`));

  return (
    <section id="header-categories">
      <ul id="btn-categories">
        <li className="has-dropdown">
          <details>
            <summary className="dropdown-toggle" aria-label="همه دسته ها">
              <i className="ph ph-list" aria-hidden="true"></i>
              <span className="dropdown-label">همه دسته ها</span>
            </summary>
            <ul className="dropdown-menu" id="dropdown-menu">
              <li>
                <StoreLink
                  href="#categories"
                  aria-current={activeCategoryId === null ? 'true' : undefined}
                  onClick={() => onPick(null)}
                >
                  همه کالاها
                </StoreLink>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <StoreLink
                    href={`#${category.slug}`}
                    aria-current={
                      activeCategoryId === category.id ? 'true' : undefined
                    }
                    onClick={() => onPick(category.id)}
                  >
                    {category.emoji} {category.name}
                  </StoreLink>
                </li>
              ))}
            </ul>
          </details>
        </li>
        {menu.map((link) => (
          <li
            key={`${link.href}-${link.label}`}
            className={categoryHrefs.has(link.href) ? 'category-shortcut' : undefined}
          >
            <StoreLink href={link.href}>{link.label}</StoreLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
