import LoadStatus from './components/LoadStatus'
import Storefront from './components/Storefront'
import { useThemeStore } from './hooks/useThemeStore'
import { useCatalog } from './hooks/useCatalog'

export default function App() {
    const theme = useThemeStore(s => s.theme)
    const { state, retry } = useCatalog()

    return (
        <div className="app" data-theme={theme}>
            {state.status === 'success' ? <Storefront data={state.data} /> : <LoadStatus state={state} onRetry={retry} />}
        </div>
    )
}
