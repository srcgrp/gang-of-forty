import fruitImg from '../../assets/products/fruit-and-vegetables.png'
import dairyImg from '../../assets/products/Dairy-products.png'
import meatImg from '../../assets/products/meat-and-protein.png'
import nutsImg from '../../assets/products/dried-fruits-and-nuts.png'
import drinksImg from '../../assets/products/beverage.png'
import pantryImg from '../../assets/products/food-products.png'

type CategoryCardData = {
  slug: string
  title: string
  href: string
  image: string
}

const CATEGORY_CARDS: CategoryCardData[] = [
  { slug: 'fruit', title: 'میوه و سبزی', href: '?category=fruit', image: fruitImg },
  { slug: 'dairy', title: 'لبنیات', href: '?category=dairy', image: dairyImg },
  { slug: 'meat', title: 'گوشت و پروتئین', href: '#offers', image: meatImg },
  { slug: 'nuts', title: 'خشکبار', href: '#offers', image: nutsImg },
  { slug: 'drinks', title: 'نوشیدنی', href: '?category=drinks', image: drinksImg },
  { slug: 'pantry', title: 'مواد غذایی', href: '?category=pantry', image: pantryImg },
]

export default function CategoryGrid() {
  return (
    <section className="categories" id="categories">
      <h2>دسته‌بندی‌ها</h2>

      <div className="category-grid">
        {CATEGORY_CARDS.map((c) => (
          <a className="category-card" href={c.href} key={c.slug}>
            <img src={c.image} alt="" />
            <h3>{c.title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}