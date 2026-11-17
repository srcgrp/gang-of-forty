import { useSyncExternalStore } from 'react'
import { getToast, subscribeToast } from '../features/toast/toastStore.ts'

export default function Toaster() {
  const toast = useSyncExternalStore(subscribeToast, getToast)

  return (
    <div className="toaster" role="status" aria-live="polite">
      {toast && <p key={toast.id} className="toast">{toast.text}</p>}
    </div>
  )
}