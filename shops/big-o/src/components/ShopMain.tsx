import { getCardInfo } from "../catalog/cardInfo"
import { filterProductsByCategoryID, filterSpecialProducts } from "../catalog/filters"
import type { Catalog, LoadState } from "../types"
import Ads from "./Ads"
import CategoryList from "./CategoryList"
import Hero from "./Hero"
import ProductGrid from "./ProductGrid"
import SaleBox from "./SaleBox"

type ShopMainProps = {
  state: LoadState<Catalog>
  categoryId : number | null
  onSelectCategory: (id: number) => void
  onRetry: () => void
}
export default function ShopMain({state, categoryId, onRetry} : ShopMainProps) {
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
            const selected = state.data.categories.find((category) => category.id === categoryId)
            return (
               <>
                    <Hero />
                    <CategoryList categories={state.data.categories}/>
                    <ProductGrid
                    sectionId="special-products"
                    title="پیشنهاد ویژه امروز"
                    products={filterSpecialProducts(state.data.offeredProducts, state.data.products, state.data.stock)}
                    getInfo={(p) => getCardInfo(p, state.data.offeredProducts, state.data.stock)}
                    headerExtra={<SaleBox />}
                    />
                    <Ads />
                    {selected !== undefined && (
                        <ProductGrid
                            sectionId={selected.slug}
                            title={selected.name}
                            products={filterProductsByCategoryID(selected.id, state.data.products)}
                            getInfo={(p) => getCardInfo(p, state.data.offeredProducts, state.data.stock)}
                        />
                    )}
                </>
            )
        }
            
        
    }
}