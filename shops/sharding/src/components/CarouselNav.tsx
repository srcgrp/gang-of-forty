import React from 'react'

type CarouselNavProps = {
  startHref: string
  endHref: string
  label: string
  variant?: 'default' | 'hero'
}

export default function CarouselNav({ startHref, endHref, label, variant = 'default' }: CarouselNavProps) {
  const navClass = variant === 'hero' ? 'hero-carousel__nav' : 'carousel-nav'
  const btnClass = variant === 'hero' ? 'hero-carousel__nav-btn' : 'carousel-nav__btn'

  function handleScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string, inline: 'start' | 'end') {
    e.preventDefault()
    window.history.pushState(null, '', href)
    const targetId = href.replace('#', '')
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline })
    }
  }

  return (
    <nav className={navClass} aria-label={`ناوبری ${label}`}>
      <a 
        href={startHref} 
        onClick={(e) => handleScroll(e, startHref, 'start')}
        className={btnClass} 
        aria-label={`رفتن به ابتدای ${label}`}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowRight" /></svg>
      </a>
      <a 
        href={endHref} 
        onClick={(e) => handleScroll(e, endHref, 'end')}
        className={btnClass} 
        aria-label={`رفتن به انتهای ${label}`}
      >
        <svg aria-hidden="true"><use href="./icons.svg#arrowLeft" /></svg>
      </a>
    </nav>
  )
}