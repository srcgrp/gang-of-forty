type Toast = { id: number; text: string }

const listeners = new Set<() => void>()
let current: Toast | null = null
let nextId = 1
let timer: ReturnType<typeof setTimeout> | undefined

function emit(): void {
  listeners.forEach((listener) => listener())
}

export function showToast(text: string): void {
  current = { id: nextId++, text }
  clearTimeout(timer)
  timer = setTimeout(() => {
    current = null
    emit()
  }, 2500)
  emit()
}

export function getToast(): Toast | null {
  return current
}

export function subscribeToast(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}