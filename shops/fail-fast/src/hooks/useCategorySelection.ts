import { useState } from 'react'

export function useCategorySelection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  return {
    selectedCategoryId,
    onCategoryPick: (categoryId: number) => setSelectedCategoryId(categoryId),
  }
}
