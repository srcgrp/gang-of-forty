import type { CartChange } from '../shared/types'
import { notyf } from './toast'
import { fireConfetti } from './confetti'

export function showCartChange(change: CartChange, name: string, result: { status: 'max' | 'noop' | 'changed'; after: number }): boolean {
  if (result.status === 'max') {
    notyf.error('امکان افزودن بیش از موجودی کالا وجود ندارد.')
    return false
  }
  if (result.status === 'noop') return false
  if (change === 'add') {
    notyf.success('کالا به سبد اضافه شد')
    void fireConfetti()
  } else {
    notyf.error(result.after === 0 ? `${name} از سبد حذف شد` : `تعداد ${name} کم شد`)
  }
  return true
}
