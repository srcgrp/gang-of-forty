/**
 * Homepage data types.
 */

export interface HomeHero {
  title: string
  text: string
  emoji: string
  cta: { label: string; href: string }
}

export interface HomeSide {
  title: string
  text: string
  emoji: string
  cta: { label: string; href: string }
}

export interface HomePromo {
  text: string
  emoji: string
  color: string
  href: string
}

export interface HomeCarousel {
  id: string
  title: string
  emoji: string
  source?: string
  categoryId?: number
}

export interface HomeData {
  hero: HomeHero
  side: HomeSide
  promos: HomePromo[]
  carousels: HomeCarousel[]
}

function isHomeCarousel(value: unknown): value is HomeCarousel {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'emoji' in value &&
    typeof (value as HomeCarousel).id === 'string' &&
    typeof (value as HomeCarousel).title === 'string' &&
    typeof (value as HomeCarousel).emoji === 'string'
  )
}

export function isHomeData(value: unknown): value is HomeData {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('carousels' in value) ||
    !Array.isArray((value as HomeData).carousels)
  ) {
    return false
  }
  return (value as HomeData).carousels.every(isHomeCarousel)
}
