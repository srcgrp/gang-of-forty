import type { Shop } from "../types"
import Faq from "./Faq"

type GuideProps = {
    shop: Shop
}

export default function Guide({ shop }: GuideProps) {
    const schedule = shop.schedule.map(function (entry) {
        return entry.days + " " + entry.time
    }).join("؛ ")
    const guideCards = [
        {
            id: "shipping",
            title: "شیوه ارسال",
            text: "سفارش‌ها در بازه‌های دوساعته ارسال می‌شوند؛" + " " +
                schedule + "." + " " + "ارسال سفارش‌های بالای" + " " +
                shop.freeDeliveryOver.toLocaleString("fa-IR") + " " +
                shop.currency + " " + "رایگان است."
        },
        {
            id: "returns",
            title: "بازگشت کالا",
            text: "اگر کالایی آسیب‌دیده یا نزدیک به تاریخ انقضا به دستتان رسید، تا ۲۴ ساعت پس از تحویل با پشتیبانی تماس بگیرید تا بدون هزینه تعویض یا مبلغ آن بازگردانده شود."
        }
    ]

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
                    <Faq shop={shop} />
                </div>
            </div>
        </section>
    )
}