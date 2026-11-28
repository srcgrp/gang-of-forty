
const categories = [
  {
    id: 'dairy',
    label: 'لبنیات',
    image: '/glossy_milk_glass_app_icon.png',
    color: 'bg-blue-tint',
    active: true,
  },
  {
    id: 'fruits',
    label: 'میوه و سبزی',
    image: '/glossy_red_apple_badge.png',
    color: 'bg-green-tint',
    active: false,
  },
  {
    id: 'protein',
    label: 'گوشت و مرغ',
    image: '/glossy_steak_badge_icon.png',
    color: 'bg-red-tint',
    active: false,
  },
  {
    id: 'bread',
    label: 'نان و شیرینی',
    image: '/bread.png',
    color: 'bg-amber-tint',
    active: true,
  },
  {
    id: 'drinks',
    label: 'نوشیدنی‌ها',
    image: '/glossy_green_juice_carton_icon.png',
    color: 'bg-teal-tint',
    active: false,
  },
  {
    id: 'snacks',
    label: 'تنقلات سالم',
    image: '/glossy_pink_popcorn_badge.png',
    color: 'bg-pink-tint',
    active: false,
  },
]

export default function CategoryTiles() {
  return (
    <section className="categories-section">
      <div className="section-title-wrapper">
        <h2 className="categories-heading">دسته‌بندی محصولات</h2>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          const content = (
            <>
              <div className={`cat-pill-icon ${category.color}`}>
                <img
                  src={category.image}
                  alt={category.label}
                  className="cat-img"
                  width="60"
                  height="60"
                  loading="lazy"
                />
              </div>
              <span className="cat-pill-name">{category.label}</span>
            </>
          )

          return category.active ? (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="cat-pill-card"
            >
              {content}
            </a>
          ) : (
            <div
              key={category.id}
              className="cat-pill-card"
              aria-disabled="true"
            >
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
