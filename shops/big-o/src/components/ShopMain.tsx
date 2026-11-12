import { getCardInfo } from "../catalog/cardInfo"
import { filterSpecialProducts } from "../catalog/filters"
import type { LoadState } from "../types"
import Ads from "./Ads"
import Hero from "./Hero"
import ProductGrid from "./ProductGrid"

type ShopMainProps = {
  state: LoadState
  onAdd: (id: number) => void
}
export default function ShopMain({state, onAdd} : ShopMainProps) {
    switch (state.status) {
        case "loading" : 
            return <p>در حال بارگذاری...</p>
        case "error" : 
            return <p>{state.message}</p>
        case "empty" :
            return <p>محصولی یافت نشد.</p>
        case "success" : 
            return (
               <>
                    <Hero />
                    <ProductGrid
                    sectionId="special-products"
                    title="پیشنهاد ویژه امروز"
                    products={filterSpecialProducts(state.offeredProducts, state.products, state.stock)}
                    getInfo={(p) => getCardInfo(p, state.offeredProducts, state.stock)}
                    onAdd={onAdd}
                    />
                    <Ads />
                </>
            )
        
    }
}