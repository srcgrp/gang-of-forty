import { useEffect, useState } from 'react'
import { loadState } from '../features/products/api/load.ts'
import type { LoadState } from '../shared/types.ts'

export function useCatalog() {
    const [state, setState] = useState<LoadState>({ status: 'loading'})
    const [attempt, setAttempt] = useState(0)   
    
    useEffect(() => {
        let ignore = false
        loadState().then((next) => { if (!ignore) setState(next) })
        return () => { ignore = true } 
    }, [attempt])
    
    const retry = () => {
        setState({ status: 'loading' })
        setAttempt((n) => n + 1)
    }
    return { state, retry }
}