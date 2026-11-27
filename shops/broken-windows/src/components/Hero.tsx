import { formatNumber } from "../format"

export default function Hero(){
  return (
    <section className="banner" id="banner">
            <div className="main-content">
                <h1 className="main-content-title"> هرچی لازم داری همینجاست</h1>
                <p className="main-content-text">بیش از {formatNumber(10)} هزار کالا با ارسال کمتر از {formatNumber(90)} دقیقه</p>
                <a href="#special-offer" className="main-content-button" aria-label="شروع خرید">شروع خرید</a>
            </div>
            <img className="main-content-banner" src="./images/banner.svg" alt=""/>
        </section>

)
}