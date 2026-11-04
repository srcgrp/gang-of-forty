import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import confetti from 'canvas-confetti'

const notyf: Notyf = new Notyf()

export function celebrate(name: string): void {
  notyf.success(name + ' به سبد اضافه شد')
  confetti({ particleCount: 60, spread: 70 })
}