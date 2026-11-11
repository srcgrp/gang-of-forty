import type { Category, ShopLink } from '../types';

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
  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId,
  );

  return (
    <section id="header-categories">
      <ul id="btn-categories">
        <li className="has-dropdown">
          <details>
            <summary className="dropdown-toggle">
              <i className="ph ph-list"></i>{' '}
              {activeCategory?.name ?? 'همه دسته ها'}
            </summary>
            <ul className="dropdown-menu" id="dropdown-menu">
              <li>
                <a
                  href="#categories"
                  aria-current={activeCategoryId === null ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    onPick(null);
                  }}
                >
                  همه کالاها
                </a>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.slug}`}
                    aria-current={
                      activeCategoryId === category.id ? 'true' : undefined
                    }
                    onClick={(event) => {
                      event.preventDefault();
                      onPick(category.id);
                    }}
                  >
                    {category.emoji} {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </li>
        {menu.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
