import Faq from "./Faq"

const guideCards = [
    {
        id: "shipping",
        title: "شیوه ارسال",
        text: "سفارش‌ها در بازه‌های دوساعته ارسال می‌شوند؛ شنبه تا پنج‌شنبه از ۸ تا ۲۲ و جمعه از ۹ تا ۱۴. ارسال سفارش‌های بالای ۵۰۰٬۰۰۰ تومان رایگان است."
    },
    {
        id: "returns",
        title: "بازگشت کالا",
        text: "اگر کالایی آسیب‌دیده یا نزدیک به تاریخ انقضا به دستتان رسید، تا ۲۴ ساعت پس از تحویل با پشتیبانی تماس بگیرید تا بدون هزینه تعویض یا مبلغ آن بازگردانده شود."
    }
]

export default function Guide() {
    return (
        <section
            className="section"
            id="shopping-guide"
            aria-labelledby="shopping-guide-title"
        >
            <div className="container">
                <header className="section__header">
                    <h2 className="section__title" id="shopping-guide-title">
                        راهنمای خرید
                    </h2>
                    <p className="section__subtitle">
                        پیش از ثبت سفارش، پاسخ پرسش‌های رایج را اینجا ببینید.
                    </p>
                </header>
                <div className="guide">
                    <div className="guide__cards">
                        {guideCards.map(function (card) {
                            return (
                                <article
                                    className="info-card"
                                    id={card.id}
                                    key={card.id}
                                >
                                    <h3 className="info-card__title">
                                        {card.title}
                                    </h3>
                                    <p className="info-card__text">
                                        {card.text}
                                    </p>
                                </article>
                            )
                        })}
                    </div>
                    <Faq />
                </div>
            </div>
        </section>
    )
}