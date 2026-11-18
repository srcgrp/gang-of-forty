import type { LoadState } from '../types';
type StatusProps = { state: LoadState };
export default function Status({ state }: StatusProps) {
    let message: string;
    switch (state.status) {
        case 'loading': message = 'در حال دریافت اطلاعات فروشگاه…'; break;
        case 'empty': message = 'هنوز محصولی در فروشگاه وجود ندارد.'; break;
        case 'error': message = state.message; break;
        case 'success': return null;
        default: { const unexpected: never = state; return unexpected; }
    }
    return <p className="load-status" role="status" aria-live="polite">{message}</p>;
}
