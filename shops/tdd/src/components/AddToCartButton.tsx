import type { Product } from '../shared/types'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { useCartStore } from '../hooks/useCartStore'

type AddToCartButtonProps = { product: Product; unavailable: boolean }
const notyf = new Notyf({ duration: 2000, position: { x: "left", y: "top" } })

export default function AddToCartButton({ product, unavailable }: AddToCartButtonProps) {
    const add = useCartStore(s => s.add)
    const handleAdd = () => {
        add(product.id)
        notyf.success("به سبد خرید اضافه شد")
    }
    return (
        <button className="add-button" type="button" aria-label={`افزودن ${product.name} به سبد خرید`} disabled={unavailable} onClick={handleAdd}>
            افزودن به سبد <span aria-hidden="true">{unavailable ? '×' : '+'}</span>
        </button>
    )
}
