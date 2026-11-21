import type { ReactNode } from 'react'

interface CategoryCardProps {
  href: string
  imgSrc: string
  alt: string
  label: string
  loading?: 'lazy' | 'eager'
}

export default function CategoryCard({
  href,
  imgSrc,
  alt,
  label,
  loading = 'lazy',
}: CategoryCardProps): ReactNode {
  return (
    <article className="popular-products-items">
      <a href={href}>
        <div className="popular-products-cards">
          <img
            src={imgSrc}
            width="60"
            height="90"
            alt={alt}
            loading={loading}
          />
          <p className="popular-products-tags">{label}</p>
        </div>
      </a>
    </article>
  )
}
