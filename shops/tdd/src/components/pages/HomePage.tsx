import { useCatalog } from '../../hooks/useCatalog'
import LoadStatus from '../LoadStatus'
import Storefront from '../Storefront'

export default function HomePage() {
    const { state, retry } = useCatalog()
    return state.status === 'success' ? <Storefront data={state.data} /> : <LoadStatus state={state} onRetry={retry} />
}
