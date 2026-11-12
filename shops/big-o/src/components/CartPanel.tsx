import type { CartItem } from "../types"

type CartPanelProps = {
    items : CartItem[]
    onAdd: (id: number) => void
    onRemove: (id: number) => void
}

export default function CartPanel({items, onAdd, onRemove} : CartPanelProps) {
    return (
        <section className="cart-panel" id="cart">
            <h2>سبد خرید</h2>
            
            {items.length === 0 ? 
                <p>سبد خرید شما خالی می باشد</p>
                
            :   <>
                    <ul className="cart-list">
                        {items.map((item) => 
                            <li key={item.id} className="cart-item">
                                <p className="cart-item-name">{item.name}</p>
                                <p>تعداد‌ : {item.qty.toLocaleString("fa-IR")} عدد</p>
                                <p>قیمت واحد : {item.price.toLocaleString("fa-IR")} تومان</p>
                                <button type="button" onClick={() => onAdd(item.id)}>
                                    <span aria-hidden="true">+</span>
                                    <span className="visually-hidden">افزودن به تعداد محصول</span>
                                </button>
                                <button type="button" onClick={() => onRemove(item.id)}>
                                    <span aria-hidden="true">-</span>
                                    <span className="visually-hidden">کم کردن تعداد محصول</span>
                                </button>
                                <p className="cart-item-total">مجموع :‌ {(item.qty * item.price).toLocaleString("fa-IR")} تومان</p>
                            </li>
                        )}
                    </ul>
                    <p className="cart-total">جمع کل‌ :‌ {items.reduce((sum, item) => sum + (item.qty * item.price) , 0).toLocaleString("fa-IR")} تومان</p>
                
                </>  
            }   
            
        </section>
    )
}