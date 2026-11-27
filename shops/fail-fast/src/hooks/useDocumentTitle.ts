import { useEffect } from 'react'

export function useDocumentTitle(itemCount: number): void {
  useEffect(() => {
    const baseTitle = 'اسپیس مارکت | سوپرمارکت شما'
    document.title = itemCount > 0 ? `(${itemCount}) ${baseTitle}` : baseTitle
  }, [itemCount])
}
