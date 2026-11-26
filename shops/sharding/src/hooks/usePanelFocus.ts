import { useEffect } from 'react'
import type { RefObject } from 'react'

export function usePanelFocus(open: boolean, panelRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const previous = document.activeElement
    panel?.querySelector<HTMLElement>('[data-initial-focus]')?.focus()

    return () => {
      const focusIsInPanel = panel?.contains(document.activeElement) || document.activeElement === document.body
      if (focusIsInPanel && previous instanceof HTMLElement && previous.isConnected) {
        previous.focus()
      }
    }
  }, [open, panelRef])
}
