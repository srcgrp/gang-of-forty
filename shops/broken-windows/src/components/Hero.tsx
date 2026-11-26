import { formatNumber } from "../format"
import banner from "../../images/banner.svg"
import { Link } from "@tanstack/react-router";

export default function Hero(){
  return (
    <section className="banner" id="banner">
            <div className="main-content">
                <h1 className="main-content-title"> هرچی لازم داری همینجاست</h1>
                <p className="main-content-text">بیش از {formatNumber(10)} هزار کالا با ارسال کمتر از {formatNumber(90)} دقیقه</p>
                <Link
  to="/products"
  search={{ sort: "default" }}
  className="main-content-button"
  aria-label="شروع خرید"
>
  شروع خرید
</Link>
            </div>
            <img className="main-content-banner" src={banner} alt="" width={400}
  height={320}/>
        </section>

)
}