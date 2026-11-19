
import { useEffect, useState } from 'react'

export type Carousel =
  | {
      id: string
      title: string
      type: 'category'
      categoryId: string
    }
  | {
      id: string
      title: string
      type: 'offers'
    }

type HomeConfig = {
  carousels: Carousel[]
}

export function useHomeConfig() {
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null)
  const [configError, setConfigError] = useState(false)

  useEffect(() => {
    let ignore = false

    fetch('/home.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load home config')
        }
        return response.json() as Promise<HomeConfig>
      })
      .then((data) => {
        if (!ignore) setHomeConfig(data)
      })
      .catch(() => {
        if (!ignore) setConfigError(true)
      })

    return () => {
      ignore = true
    }
  }, [])

  return { homeConfig, configError }
}
