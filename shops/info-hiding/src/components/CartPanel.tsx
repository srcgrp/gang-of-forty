import type { CartRow } from '../types';
import { formatNumber } from '../catalog/pricing';
type CartPanelProps = { rows: CartRow[]; total: string; onRemove: (id: number) => void };
export default function CartPanel({ rows, total, onRemove }: CartPanelProps) {
    return <section id="cart-panel" className="category-section" aria-labelledby="cart-title">
        <h2 id="cart-title">سبد خرید شما</h2>
        <div id="cart-items">
            {rows.length === 0 && <p>سبد خرید شما خالی است.</p>}
            {rows.map(row => <div className="cart-row" key={row.id}>
                <span>{row.name} × {formatNumber(row.quantity)}</span>
                <span>{row.subtotal}</span>
                <button type="button" onClick={() => onRemove(row.id)} aria-label={'حذف ' + row.name}>حذف</button>
            </div>)}
        </div>
        <p>جمع کالاها: <strong id="cart-total" aria-live="polite">{total}</strong></p>
        <p>مبلغ نهایی سفارش باید هنگام خرید توسط سرور تأیید شود.</p>
    </section>;
}
