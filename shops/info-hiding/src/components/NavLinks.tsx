import { Link } from '@tanstack/react-router';
export default function NavLinks() {
    return <>
        <Link to="/">خانه و دسته‌بندی‌ها</Link>
        <Link to="/plp/$carouselId" params={{ carouselId: 'offers' }}>پیشنهاد ویژه امروز</Link>
        <Link to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>لبنیات</Link>
    </>;
}