import { useEffect, useRef, useState } from 'react'
import BannerCarousel from './BannerCarousel'

type HeroProps = {
  banners: string[]
  title?: string
  text?: string
  ctaLabel?: string
  ctaHref?: string
  loading?: boolean
}

export default function Hero({
  banners,
  title = 'فروشگاه آنلاین کیوی',
  text = 'تازه‌ترین مواد غذایی، مستقیم از مزرعه',
  ctaLabel = 'مشاهده محصولات',
  ctaHref = '#fruits',
  loading = false,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (loading) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return
    if (!window.matchMedia('(min-width: 768px)').matches) return

    const video = videoRef.current
    if (!video) return

    video.src = `${import.meta.env.BASE_URL}assets/video/hero.mp4`
    void video.play().then(() => setVideoReady(true)).catch(() => {})
  }, [loading])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className={`hero-video ${loading ? 'hero-video--skeleton' : ''}`}>
          <video
            ref={videoRef}
            className="hero-video__media"
            muted
            loop
            playsInline
            preload="none"
            poster="./assets/video/hero-poster.webp"
            aria-hidden="true"
            style={{ display: videoReady ? 'block' : 'none' }}
          />
          <div className="hero-video__overlay">
            <h1 className="hero-video__title" id="hero-title">
              {loading ? ' ' : title}
            </h1>
            <p className="hero-video__desc">
              {loading ? ' ' : text}
            </p>
            {!loading && (
              <a href={ctaHref} className="hero-video__cta">
                <span>{ctaLabel}</span>
                <svg className="hero-video__cta-icon" aria-hidden="true">
                  <use href="./icons.svg#arrowForward" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <BannerCarousel banners={banners} loading={loading} />
      </div>
    </section>
  )
}