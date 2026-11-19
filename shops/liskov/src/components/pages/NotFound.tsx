import {Link} from '@tanstack/react-router';

export default function NotFound() {
    return (
        <main id='main' className='page-section' tabIndex={-1}>
            <h1>صفحه موردنظر پیدا نشد!</h1>
            <p>آدرسی که وارد کردی وجود نداره.</p>

            <Link to='/' className='page-back-link'>
                ← بازگشت به صفحه اصلی
            </Link>
        </main>
    );
}
