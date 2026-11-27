import type { Product, Offer } from '../types';
import { formatNumber, formatPrice } from '../catalog/pricing';
import { cartRows, cartTotal } from '../cart/rows';
import { useCartStore } from '../hooks/useCartStore';
type CartPanelProps = { products: Product[]; offers: Offer[] };
export default function CartPanel({ products, offers }: CartPanelProps) {
    const lines = useCartStore(state => state.lines);
    const remove = useCartStore(state => state.remove);
    const rows = cartRows(lines, products, offers);
    const total = formatPrice(cartTotal(lines, products, offers));
    return <section id="cart-panel" className="category-section" aria-labelledby="cart-title">
        <h2 id="cart-title">سبد خرید شما</h2>
        <div id="cart-items">
            {rows.length === 0 && <p>سبد خرید شما خالی است.</p>}
            {rows.map(row => <div className="cart-row" key={row.id}>
                <span>{row.name} × {formatNumber(row.quantity)}</span>
                <span>{row.subtotal}</span>
                <button type="button" onClick={() => remove(row.id)} aria-label={'حذف ' + row.name}>حذف</button>
            </div>)}
        </div>
        <p>جمع کالاها: <strong id="cart-total" aria-live="polite">{total}</strong></p>
    </section>;
}
