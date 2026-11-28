import { useCatalogData } from '../../hooks/useCatalogData'
import Storefront from '../Storefront'

export default function HomePage() {
    return <Storefront data={useCatalogData()} />
}
