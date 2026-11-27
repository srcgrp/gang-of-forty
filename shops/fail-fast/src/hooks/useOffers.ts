import { useState, useEffect } from 'react'
import type { LoadState, Offer } from '../types'
import { getJSON } from '../api/client'

const API_BASE = import.meta.env.VITE_API_URL

function isOffer(value: unknown): value is Offer {
  return (
    typeof value === 'object' &&
    value !== null &&
    'productId' in value &&
    'percent' in value &&
    typeof (value as Offer).productId === 'number' &&
    typeof (value as Offer).percent === 'number'
  )
}

export function useOffers(): LoadState<Offer[]> {
  const [dataState, setDataState] = useState<LoadState<Offer[]>>({
    status: 'loading',
  })

  useEffect(() => {
    let ignore = false
    getJSON(`${API_BASE}/offers.json`)
      .then((data) => {
        if (ignore) return
        if (!Array.isArray(data)) {
          setDataState({ status: 'error', message: 'داده پیشنهادات نامعتبر است' })
          return
        }
        const offers = data.filter(isOffer)
        setDataState({ status: 'success', data: offers })
      })
      .catch(() => {
        if (ignore) return
        setDataState({
          status: 'error',
          message: 'دریافت پیشنهادات ناموفق بود.',
        })
      })
    return () => {
      ignore = true
    }
  }, [])

  return dataState
}
