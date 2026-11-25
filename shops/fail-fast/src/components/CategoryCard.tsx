import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

interface CategoryCardProps {
  hash: string
  imgSrc: string
  alt: string
  label: string
  loading?: 'lazy' | 'eager'
}

export default function CategoryCard({
  hash,
  imgSrc,
  alt,
  label,
  loading = 'lazy',
}: CategoryCardProps): ReactNode {
  return (
    <article className="popular-products-items">
      <Link to="/" hash={hash}>
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
      </Link>
    </article>
  )
}
