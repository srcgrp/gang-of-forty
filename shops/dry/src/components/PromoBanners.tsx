import fruitsCover from '../../assets/products/fruites-cover.png'
import dairyCover from '../../assets/products/diary-products-cover.png'

type Promo = {
  id?: string
  title: string
  text: string
  image: string
  alt: string
}

const PROMOS: Promo[] = [
  { id: 'fruits', title: 'میوه‌های تازه', text: 'مستقیم از مزرعه', image: fruitsCover, alt: 'میوه های تازه' },
  { title: 'لبنیات با کیفیت', text: 'برای خانواده شما', image: dairyCover, alt: 'لبنیات با کیفیت' },
]

export default function PromoBanners() {
  return (
    <section className="promo-banners">
      {PROMOS.map((p) => (
        <div className="promo-card" id={p.id} key={p.title}>
          <img src={p.image} alt={p.alt} />
          <div className="promo-content">
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <button type="button">مشاهده بیشتر</button>
          </div>
        </div>
      ))}
    </section>
  )
}