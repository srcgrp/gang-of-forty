import firstBannerImg from "../../assets/products/watermelon.svg";
import secondBannerImg from "../../assets/products/cheese.svg";

export default function Hero() {
    return (
        <div className="banner">
            <section className="first-banner" >
                <h2>میوه های تازه،<br/> هر روز صبح</h2>
                <p>مستقیم از باغ های اطراف شهر، تا دو ساعت بعد دم در خانه شما.</p>
                <div className="first-banner-link">
                <a href="#">خرید میوه و سبزی</a>
                <img src={ firstBannerImg } alt=""/>
                </div>


            </section>
            <section className="second-banner" >
                    <h2>۲۰٪ تخفیف لبنیات</h2>
                    <p>فقط تا پایان هفته</p>
                    <div className="second-banner-link">
                        <img src={ secondBannerImg } alt=""/>
                        <a href="#dairy">دیدن محصولات</a>
                    </div>

            </section>
        </div>
    )
}