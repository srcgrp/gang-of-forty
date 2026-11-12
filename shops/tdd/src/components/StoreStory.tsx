import storyImage from '../../2.jpg'

export default function StoreStory() {
    return (
        <section className="story" id="story" aria-labelledby="story-title">
            <div className="story-image">
                <img src={storyImage} alt="انار تازه و رسیده" />
                <span>تازگی در سبد امروز</span>
            </div>
            <div>
                <p className="eyebrow">تازگی، فقط یک شعار نیست</p>
                <h2 id="story-title">اول بررسی، بعد راهی سبد تو.</h2>
                <p>برای سام، انتخاب میوه از یک سؤال شروع می‌شود: آیا تازگی‌اش با معیار ما هماهنگ است؟ رسیدگی مناسب، ظاهر سالم و شرایط نگهداری، معیارهای پیشنهادی ما برای ارزیابی‌اند؛ تا طعم و رنگ فصل، با دقت بیشتری به سبدت برسد.</p>
                <a href="#about">با ایده سام مارکت آشنا شو</a>
            </div>
        </section>
    )
}
