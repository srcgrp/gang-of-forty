import { useEffect, useState } from 'react'
import { formatNumber } from '../features/products/catalog/format.ts'

const SALE_SECONDS = 600

export default function SaleCountdown() {
    const [left, setLeft] = useState(SALE_SECONDS)

    useEffect(() => {
        const id = setInterval(() => {
            console.log('tick')
            setLeft((s) => Math.max(s - 1, 0))
        }, 1000)
        return () => {
            console.log('cleanup: interval stopped')
            clearInterval(id)
        }
    },[])

    const minutes = Math.floor(left / 60)
    const seconds = left % 60 
    const pad = seconds < 10 ? '۰' : ''

    return (
        <p className="sale-timer" role="timer">
            {left === 0 ? 'تخفیف به اتمام رسید' :  `${formatNumber(minutes)}:${pad}${formatNumber(seconds)}`}
        </p>
    )
}