import { useState, useEffect } from 'react'
import type { LoadState, HomeData } from '../types'
import { isHomeData } from '../types/home'
import { getJSON } from '../api/client'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export function useHomeData(): LoadState<HomeData> {
  const [dataState, setDataState] = useState<LoadState<HomeData>>({
    status: 'loading',
  })

  useEffect(() => {
    let ignore = false
    getJSON(`${API_BASE}/home.json`)
      .then((data) => {
        if (ignore) return
        if (!isHomeData(data)) {
          setDataState({ status: 'error', message: 'داده صفحه اصلی نامعتبر است' })
          return
        }
        setDataState({ status: 'success', data })
      })
      .catch(() => {
        if (ignore) return
        setDataState({
          status: 'error',
          message: 'دریافت داده صفحه اصلی ناموفق بود.',
        })
      })
    return () => {
      ignore = true
    }
  }, [])

  return dataState
}
