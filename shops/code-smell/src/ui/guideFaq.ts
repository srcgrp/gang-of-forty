import type { Shop } from "../types"
import { shopContent } from "./shopContent"

const numberFormat = new Intl.NumberFormat("fa-IR")

export function createGuideFaq(shop: Shop): HTMLDivElement {
    const faq = document.createElement("div")
    faq.className = "faq"
    faq.id = "faq"

    const heading = document.createElement("h3")
    heading.className = "faq__title"
    heading.textContent = shopContent.guide.faqTitle
    faq.append(heading)

    shopContent.guide.questions.forEach(function (item, index) {
        const details = document.createElement("details")
        details.className = "faq__item"
        details.setAttribute("name", "faq")
        let answer = item.answer
        if (index === 0) {
            answer =
                "ارسال برای سفارش‌های بالای" + " " +
                numberFormat.format(shop.freeDeliveryOver) + " " +
                shop.currency + " " +
                "رایگان است و برای سایر سفارش‌ها" + " " +
                numberFormat.format(shop.deliveryFee) + " " +
                shop.currency + " " + "هزینه دارد."
        }

        const question = document.createElement("summary")
        question.className = "faq__question"
        question.textContent = item.question
        const text = document.createElement("p")
        text.className = "faq__answer"
        text.textContent = answer
        details.append(question, text)
        faq.append(details)
    })

    return faq
}