export default function Notification(){
    return(
        <section className="notification" id="notification">
            <div className="notification-text">
                <h3>از شگفتانه های ویژه سارا مارکت جا نمونی!</h3>
                <p>عضو شو تا اولین نفری که خبردار میشه خودت باشی</p>
            </div>
            <form className="notification-signingin" action="#" method="post">
                <input className="notification-input" type="email" id="email" name="email"
                    placeholder="ایمیل خود را وارد کنید" aria-label="ایمیل برای عضویت در سایت"/>
                <button className="notification-button" type="submit">عضویت</button>
            </form>
        </section>

    )
}