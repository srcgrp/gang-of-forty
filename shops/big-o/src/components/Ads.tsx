import firstAdImg from "../../assets/products/pan.svg";
import secondAdImg from "../../assets/products/croissant.svg";

export default function Ads() {
    return(
        <div className="ads">
            <aside aria-labelledby="breakfast-ad-title">
                <h2 id="breakfast-ad-title">سبد صبحانه خانواده</h2>
                <img src={ firstAdImg } alt="" />
            </aside>
            <aside aria-labelledby="bread-ad-title">
                <h2 id="bread-ad-title">نان داغ، هر روز ساعت ۷</h2>
                <img src={ secondAdImg } alt="" />
            </aside>
        </div>
    )
}