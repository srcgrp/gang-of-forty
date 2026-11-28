import { useState, useEffect } from 'react'
import type { Product, Category, LoadState } from '../types'
import { getJSON } from '../api/client'
import { filterValidProducts, isCategory } from '../api/guards'

interface AppData {
  products: Product[]
  categories: Category[]
}

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export function useAppData(): LoadState<AppData> {
  const [dataState, setDataState] = useState<LoadState<AppData>>({
    status: 'loading',
  })

  useEffect(() => {
    let ignore = false
    Promise.all([
      getJSON(`${API_BASE}/products.json`),
      getJSON(`${API_BASE}/categories.json`),
    ])
      .then(([productsData, categoriesData]) => {
        if (ignore) return
        const products = filterValidProducts(productsData)
        if (!Array.isArray(categoriesData)) {
          setDataState({ status: 'error', message: 'داده دستهبندی نامعتبر است' })
          return
        }
        const categories = categoriesData.filter(isCategory)
        if (products.length === 0 || categories.length === 0) {
          setDataState({ status: 'empty' })
          return
        }
        setDataState({ status: 'success', data: { products, categories } })
      })
      .catch(() => {
        if (ignore) return
        setDataState({
          status: 'error',
          message: 'دریافت داده با مشکل مواجه شد.',
        })
      })
    return () => {
      ignore = true
    }
  }, [])

  return dataState
}
