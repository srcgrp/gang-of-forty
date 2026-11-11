import { useEffect } from 'react'

export function useScrollToHash(isReady: boolean) {
  useEffect(() => {
    if (!isReady) return

    function scrollToHash() {
      const hash = window.location.hash
      if (!hash) return
      
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const timer = setTimeout(scrollToHash, 50)
    
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [isReady])
}