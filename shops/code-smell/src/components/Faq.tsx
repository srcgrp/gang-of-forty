const questions = [
    {
        question: "هزینه ارسال چقدر است؟",
        answer: "ارسال برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان رایگان است و برای سایر سفارش‌ها ۳۵٬۰۰۰ تومان هزینه دارد."
    },
    {
        question: "سفارشم چه زمانی تحویل می‌شود؟",
        answer: "سفارش در نخستین بازه زمانی خالی ارسال می‌شود؛ معمولاً کمتر از دو ساعت پس از ثبت سفارش."
    },
    {
        question: "چه روش‌های پرداختی دارید؟",
        answer: "می‌توانید آنلاین با همه کارت‌های عضو شتاب پرداخت کنید یا هنگام تحویل با کارت‌خوان سیار."
    },
    {
        question: "می‌توانم سفارشم را لغو کنم؟",
        answer: "بله؛ تا پیش از ارسال، با تماس با پشتیبانی می‌توانید سفارش را بدون هزینه لغو کنید."
    }
]

export default function Faq() {
    return (
        <div className="faq" id="faq">
            <h3 className="faq__title">پرسش‌های پرتکرار</h3>
            {questions.map(function (item) {
                return (
                    <details className="faq__item" name="faq" key={item.question}>
                        <summary className="faq__question">
                            {item.question}
                        </summary>
                        <p className="faq__answer">{item.answer}</p>
                    </details>
                )
            })}
        </div>
    )
}