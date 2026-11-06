import saladImg from '../../assets/banners/ghazaye-salem.png'
import chickenImg from '../../assets/banners/morgh-gril.png'
import familyImg from '../../assets/banners/ghazaye-khanevade.png'

type Post = {
  slug: string
  title: string
  text: string
  image: string
  alt: string
}

const POSTS: Post[] = [
  { slug: 'quick-healthy', title: '۱۰ دستور پخت سریع و سالم', text: 'ایده‌های ساده برای آشپزی روزانه', image: saladImg, alt: 'غذای سالم' },
  { slug: 'grilled-chicken', title: 'طرز تهیه مرغ گریل شده', text: 'یک غذای خوشمزه و سالم', image: chickenImg, alt: 'مرغ گریل شده' },
  { slug: 'family-meals', title: 'غذاهای مناسب خانواده', text: 'پیشنهادهای جدید مارتو', image: familyImg, alt: 'غذای مناسب خانواده' },
]

export default function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="section-title">
        <h2>مجله مارتو</h2>
        <a href="#">مطالب بیشتر</a>
      </div>

      <div className="blog-grid">
        {POSTS.map((p) => (
          <article className="blog-card" key={p.slug}>
            <div className="blog-image">
              <img src={p.image} alt={p.alt} />
            </div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}