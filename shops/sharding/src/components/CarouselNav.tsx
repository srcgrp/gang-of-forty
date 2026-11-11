import { writeUrlHash } from '../shared/storage/url'

type CarouselNavProps = {
  isAtStart: boolean
  isAtEnd: boolean
  onPrev: () => void
  onNext: () => void
  label: string
  sectionId: string
  variant?: 'default' | 'hero'
}

export default function CarouselNav({ isAtStart, isAtEnd, onPrev, onNext, label, sectionId, variant = 'default' }: CarouselNavProps) {
  const navClass = variant === 'hero' ? 'hero-carousel__nav' : 'carousel-nav'
  const btnClass = variant === 'hero' ? 'hero-carousel__nav-btn' : 'carousel-nav__btn'

  function navigate(scroll: () => void): void {
    writeUrlHash(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    scroll()
  }

  return (
    <nav className={navClass} aria-label={`ناوبری ${label}`}>
      <button
        type="button"
        className={btnClass}
        onClick={() => navigate(onPrev)}
        aria-label={`رفتن به ابتدای ${label}`}
        aria-disabled={isAtStart}
        disabled={isAtStart}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowRight" /></svg>
      </button>
      
      <button
        type="button"
        className={btnClass}
        onClick={() => navigate(onNext)}
        aria-label={`رفتن به انتهای ${label}`}
        aria-disabled={isAtEnd}
        disabled={isAtEnd}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowLeft" /></svg>
      </button>
    </nav>
  )
}
