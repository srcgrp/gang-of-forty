type CarouselNavProps = {
  isAtStart: boolean
  isAtEnd: boolean
  onPrev: () => void
  onNext: () => void
  variant?: 'default' | 'hero'
}

export default function CarouselNav({ 
  isAtStart, 
  isAtEnd, 
  onPrev, 
  onNext, 
  variant = 'default' 
}: CarouselNavProps) {
  const navClass = variant === 'hero' ? 'hero-carousel__nav' : 'carousel-nav'
  const btnClass = variant === 'hero' ? 'hero-carousel__nav-btn' : 'carousel-nav__btn'

  return (
    <nav className={navClass} aria-label="ناوبری لیست">
      <button
        type="button"
        className={btnClass}
        onClick={onPrev}
        aria-label="رفتن به ابتدای لیست"
        aria-disabled={isAtStart}
        disabled={isAtStart}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowRight" /></svg>
      </button>
      
      <button
        type="button"
        className={btnClass}
        onClick={onNext}
        aria-label="رفتن به انتهای لیست"
        aria-disabled={isAtEnd}
        disabled={isAtEnd}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowLeft" /></svg>
      </button>
    </nav>
  )
}