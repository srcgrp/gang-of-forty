type HeroProps = {
  id?: string
}

export default function Hero({ id = 'posters' }: HeroProps) {
  const isSecondPoster = id === 'posters-2'

  return (
    <section
      className="posters"
      id={id}
      aria-label={
        isSecondPoster
          ? 'پیشنهادهای ویژه بیشتر'
          : 'پیشنهادهای ویژه'
      }
    />
  )
}
