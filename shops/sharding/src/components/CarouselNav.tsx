import { useNavigate } from '@tanstack/react-router'

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
  const navigate = useNavigate()
  const navClass = variant === 'hero' ? 'hero-carousel__nav' : 'carousel-nav'
  const btnClass = variant === 'hero' ? 'hero-carousel__nav-btn' : 'carousel-nav__btn'

  function move(scroll: () => void): void {
    void navigate({ to: '.', hash: sectionId, search: true, resetScroll: false })
    scroll()
  }

  return (
    <nav className={navClass} aria-label={`ناوبری ${label}`}>
      <button
        type="button"
        className={btnClass}
        onClick={() => move(onPrev)}
        aria-label={`نمایش موارد قبلی ${label}`}
        aria-disabled={isAtStart}
        disabled={isAtStart}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowRight" /></svg>
      </button>
      
      <button
        type="button"
        className={btnClass}
        onClick={() => move(onNext)}
        aria-label={`نمایش موارد بعدی ${label}`}
        aria-disabled={isAtEnd}
        disabled={isAtEnd}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowLeft" /></svg>
      </button>
    </nav>
  )
}
