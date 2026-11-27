import { useSyncExternalStore } from 'react'
import {
  getFavorites,
  subscribeFavorites,
  toggleStoredFavorite,
} from '../features/favorites/storage/favoritesStorage.ts'

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribeFavorites, getFavorites)
  return { favorites, toggle: toggleStoredFavorite }
}