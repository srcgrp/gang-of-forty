import deliveryIcon from '../../assets/icons/delivery-icon.svg';

export default function Announcement() {
    return (
        <div className="announcement">
            <img src={deliveryIcon} alt=""/>
            <p>ارسال رایگان برای خریدهای بالای ۵۰۰,۰۰۰ تومان</p>
        </div>
    )
}