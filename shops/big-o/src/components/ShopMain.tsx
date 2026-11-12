import { getCardInfo } from "../catalog/cardInfo"
import { filterProductsByCategoryID, filterSpecialProducts } from "../catalog/filters"
import type { LoadState } from "../types"
import Ads from "./Ads"
import CategoryList from "./CategoryList"
import Hero from "./Hero"
import ProductGrid from "./ProductGrid"

type ShopMainProps = {
  state: LoadState
  onAdd: (id: number) => void
  categoryId : number | null
  onSelectCategory: (id: number) => void
}
export default function ShopMain({state, onAdd, categoryId, onSelectCategory} : ShopMainProps) {
    switch (state.status) {
        case "loading" : 
            return <p className="msg load-msg">در حال بارگذاری...</p>
        case "error" : 
            return <p className="msg error-msg">{state.message}</p>
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