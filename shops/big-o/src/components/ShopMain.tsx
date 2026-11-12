import { getCardInfo } from "../catalog/cardInfo"
import { filterProductsByCategoryID, filterSpecialProducts } from "../catalog/filters"
import type { LoadState } from "../types"
import Ads from "./Ads"
import CategoryList from "./CategoryList"
import Hero from "./Hero"
import ProductGrid from "./ProductGrid"
import SaleBox from "./SaleBox"

type ShopMainProps = {
  state: LoadState
  onAdd: (id: number) => void
  categoryId : number | null
  onSelectCategory: (id: number) => void
  onRetry: () => void
}
export default function ShopMain({state, onAdd, categoryId, onSelectCategory, onRetry} : ShopMainProps) {
    switch (state.status) {
        case "loading" : 
            return <p className="msg load-msg">در حال بارگذاری...</p>
        case "error" : 
            return (
                <div className="msg error-msg" role="alert">
                    <p>بارگذاری اطلاعات ممکن نشد. {state.message}</p>
                    <button type="button" className="retry-button" onClick={onRetry}>تلاش دوباره</button>
                </div>
            )
        case "empty" :
            return <p className="msg load-msg" >محصولی یافت نشد.</p>
        case "success" : {
            const selected = state.categories.find((category) => category.id === categoryId)
            return (
               <>
                    <Hero />
                    <CategoryList categories={state.categories} onSelect={onSelectCategory}/>
                    <ProductGrid
                    sectionId="special-products"
                    title="پیشنهاد ویژه امروز"
                    products={filterSpecialProducts(state.offeredProducts, state.products, state.stock)}
                    getInfo={(p) => getCardInfo(p, state.offeredProducts, state.stock)}
                    onAdd={onAdd}
                    headerExtra={<SaleBox />}
                    />
                    <Ads />
                    {selected !== undefined && (
                        <ProductGrid
                            sectionId={selected.slug}
                            title={selected.name}
                            products={filterProductsByCategoryID(selected.id, state.products)}
                            getInfo={(p) => getCardInfo(p, state.offeredProducts, state.stock)}
                            onAdd={onAdd}
                        />
                    )}
                </>
            )
        }
            
        
    }
}