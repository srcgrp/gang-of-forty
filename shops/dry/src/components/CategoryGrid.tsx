import fruitImg from '../../assets/products/fruit-and-vegetables.png'
import dairyImg from '../../assets/products/Dairy-products.png'
import meatImg from '../../assets/products/meat-and-protein.png'
import nutsImg from '../../assets/products/dried-fruits-and-nuts.png'
import drinksImg from '../../assets/products/beverage.png'
import pantryImg from '../../assets/products/food-products.png'

type CategoryCardData = {
  slug: string
  title: string
  image: string
  categoryId?: number
}

type CategoryGridProps = {
  onPick: (id: number) => void
}

const CATEGORY_CARDS: CategoryCardData[] = [
  { slug: 'fruit', title: 'میوه و سبزی', image: fruitImg, categoryId: 1 },
  { slug: 'dairy', title: 'لبنیات', image: dairyImg, categoryId: 2 },
  { slug: 'meat', title: 'گوشت و پروتئین', image: meatImg },
  { slug: 'nuts', title: 'خشکبار', image: nutsImg },
  { slug: 'drinks', title: 'نوشیدنی', image: drinksImg, categoryId: 5 },
  { slug: 'pantry', title: 'مواد غذایی', image: pantryImg, categoryId: 4 },
]

export default function CategoryGrid({ onPick }: CategoryGridProps) {
  return (
    <section className="categories" id="categories">
      <h2>دسته‌بندی‌ها</h2>

      <div className="category-grid">
        {CATEGORY_CARDS.map((c) => (
          <a
            className="category-card"
            href={c.categoryId === undefined ? '#offers' : '#products'}
            key={c.slug}
            onClick={() => {
              if (c.categoryId !== undefined) onPick(c.categoryId)
            }}
          >
            <img src={c.image} alt="" />
            <h3>{c.title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}