import { Notyf } from 'notyf'
import Swal from 'sweetalert2'
import 'notyf/notyf.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const notyf = new Notyf({ duration: 2000, position: { x: "left", y: "top" } })
const priceFormatter = new Intl.NumberFormat("fa-IR")

export function renderCartCount(count: number): void {
    const formatted = priceFormatter.format(count)
    const label = document.querySelector<HTMLElement>("#cart-count")
    const cart = document.querySelector<HTMLAnchorElement>(".cart")
    const clearButton = document.querySelector<HTMLButtonElement>("#clear-cart")
    if (!label || !cart || !clearButton) throw new Error("Missing cart elements")
    label.textContent = formatted
    cart.setAttribute("aria-label", "سبد خرید، " + formatted + " کالا")
    clearButton.disabled = count === 0
}

export function cartStatus(message: string): void {
    const status = document.querySelector<HTMLParagraphElement>("#cart-status")
    if (!status) throw new Error("Missing cart status")
    status.textContent = message
}

export function notifyAdded(): void {
    notyf.success("به سبد خرید اضافه شد")
}

export function enableClearCart(onClear: () => void): void {
    const button = document.querySelector<HTMLButtonElement>("#clear-cart")
    if (!button) throw new Error("Missing cart controls")
    button.addEventListener("click", onClear)
}

export function watchCartChanges(onChange: (event: StorageEvent) => void): void {
    window.addEventListener("storage", onChange)
}

export async function confirmClearCart(): Promise<boolean> {
    const result = await Swal.fire({
        title: "سبد خرید خالی شود؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله، خالی شود",
        cancelButtonText: "انصراف",
        focusCancel: true
    })
    return result.isConfirmed
}
