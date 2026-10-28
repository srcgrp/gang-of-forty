import { createTextElement } from './elements'

const brandStory = {"paragraphs": ["سام مارکت، سوپرمارکت سام در پروژه بوتکمپ است؛ با یک سبد برای نیازهای روزمره و یک داستان از دنیای برنامه‌نویسی. نام پروژه، TDD، یادآور هدف سام است: تسلط بر توسعه آزمون‌محور تا پایان بوتکمپ.", "در توسعه آزمون‌محور، اول یک تست ناموفق می‌نویسیم، بعد کد لازم برای پاس‌شدن آن را می‌سازیم و در پایان ساختار کد را بهبود می‌دهیم. سام از این نگاه برای ایده ارزیابی تازگی الهام گرفته: اول معیار مشخص، بعد بررسی محصول و در ادامه بهبود شیوه انتخاب. این فرایند، طرح پیشنهادی برند در پروژه بوتکمپ فرانت اند است؛ چرخه نرم‌افزاری TDD الهام آن است."], "steps": [{"title": "قرمز؛ اول معیار، بعد انتخاب", "text": "در TDD، تست پیش از راه‌حل نوشته می‌شود. در ایده سام، معیار تازگی را پیش از انتخاب مشخص می‌کنیم؛ محصولی که با معیار هماهنگ نیست، نیاز به بررسی دارد."}, {"title": "سبز؛ انتخاب پس از ارزیابی", "text": "همان‌طور که کد باید تست را پاس کند، در فرایند پیشنهادی سام هم انتخاب محصول باید با معیارهای تعریف‌شده هماهنگ باشد؛ تازگی، پشتوانه انتخاب است."}, {"title": "آبی؛ بهترشدن فرایند", "text": "در بازآرایی، ساختار کد بهتر می‌شود و تست‌ها همچنان موفق می‌مانند. در ایده فروشگاه هم بازخوردها به بهترشدن ارزیابی و نگهداری کمک می‌کنند؛ با حفظ معیار تازگی."}]}
export function renderAbout(about: string): void {
    const section = document.querySelector<HTMLElement>("#about")
    if (!section) throw new Error("Missing about section")
    const heading = createTextElement("h2", "داستان سام مارکت")
    heading.id = "about-title"
    const prose = document.createElement("div")
    prose.className = "about-columns"
    const introduction = document.createElement("div")
    introduction.append(
        createTextElement("p", about),
        createTextElement("p", brandStory.paragraphs[0])
    )
    const explanation = document.createElement("div")
    brandStory.paragraphs.slice(1).forEach(text => {
        explanation.append(createTextElement("p", text))
    })
    prose.append(introduction, explanation)
    section.replaceChildren(heading, prose)
    const steps = document.createElement("div")
    steps.className = "store-sections"
    brandStory.steps.forEach((step, index) => {
        const article = document.createElement("article")
        const icon = createTextElement("span", ["🔴", "🟢", "🔵"][index])
        icon.setAttribute("aria-hidden", "true")
        const copy = document.createElement("div")
        copy.append(createTextElement("h3", step.title), createTextElement("p", step.text))
        article.append(icon, copy)
        steps.append(article)
    })
    section.append(steps)
}
