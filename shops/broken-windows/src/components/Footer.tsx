export default function Footer(){
    return(<footer id="footer">
        <div className="footer">
            <div className="footer-top">
                <div className="footer-top-info">
                    <h3 className="footer-top-info-header">سارا مارکت</h3>
                    <p className="footer-top-info-text">از سال ۱۴۰۵ کنار شما هستیم؛ هر چی لازم داری، با قیمت منصفانه و ارسال
                        سریع. ایراد کوچیک رو همون لحظه درست می‌کنیم.</p>
                    <div className="footer-top-info-icon">
                        <a title="تلگرام" href="#" aria-label="ایدی تلگرام سارا مارکت"> <svg aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="footer-icon-social">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 14l11 -11" />
                                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg></a>
                        <a title="اینستاگرام" href="#" aria-label="ایدی اینستا سارا مارکت"><svg aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="footer-icon-social">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                <path d="M16.5 7.5v.01" />
                            </svg></a>
                        <a title="واتساپ" href="#" aria-label="ایدی واتسپ سارا مارکت"><svg aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="footer-icon-social">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                <path
                                    d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                            </svg></a>
                    </div>
                </div>
                <div className="footer-top-categories">
                    <h4 className="footer-top-header">دسته ها</h4>
                    <ul className="footer-top-categories-list" id="footer-categories">
                        <li className="footer-top-categories-list-item"><a href="#categories">تنقلات</a></li>
                        <li className="footer-top-categories-list-item"><a href="#categories">لبنیات و بستنی</a></li>
                        <li className="footer-top-categories-list-item"><a href="#categories">میوه و سبزی</a></li>
                        <li className="footer-top-categories-list-item"><a href="#categories">خواربار و نان</a></li>
                        <li className="footer-top-categories-list-item"><a href="#categories">نوشیدنی</a></li>
                        <li className="footer-top-categories-list-item"><a href="#categories">صبحانه</a></li>
                        <li className="footer-top-categories-list-item"><a href="#special-offer-nuts">آجیل دسر و شیرینی</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-top-contact">
                    <h4 className="footer-top-header">تماس با ما</h4>
                    <div className="footer-top-contact-address">
                        <a href="#" aria-label="آدرس سارا مارکت در نقشه"><svg aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#FBEAF0" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="footer-icon">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                <path
                                    d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
                            </svg></a>
                        <address className="address"></address>
                    </div>
                    <div className="footer-top-contact-phone">
                        <a href="#" aria-label="شماره تلفن سارا مارکت"><svg aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#FBEAF0" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="footer-icon">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            </svg></a>
                        <a className="footer-top-contact-phonenumber" href="tel:+989294493433" dir="ltr"
                            id="phonenumber" aria-label="شماره تماس فروشگاه"></a>
                    </div>
                </div>
                <div className="footer-top-openhours">
                    <h4 className="footer-top-header"> ساعت کاری</h4>
                    <div className="footer-top-openhours-box">
                        <div className="footer-top-openhours-box-clock">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="#F4A6B8" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                <path d="M12 12l3 2" />
                                <path d="M12 7v5" />
                            </svg>
                            <p className="footer-top-openhours-box-title">همه روزه باز هستیم</p>
                        </div>
                        <p className="footer-top-openhours-box-text">شنبه تا پنجشنبه ۸ تا ۲۴</p>
                        <p className="footer-top-openhours-box-text">جمعه ها ۱۰ تا ۲۴</p>
                    </div>
                </div>
            </div>
            <div className="footer-buttom">
                <div className="footer-buttom-right">
                    <p>&copy; ۱۴۰۵ سارامارکت. همه حقوق محفوظ است. | پنجره شکسته، از دار و دسته‌ی چهل‌نفره</p>
                </div>
                <div className="footer-buttom-left">
                    <a className="footer-buttom-left-link" aria-label="بازگشت به ابتدای صفحه" href="#top"><svg
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="#FBEAF0" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-up">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M16 9l-4 -4" />
                            <path d="M8 9l4 -4" />
                        </svg>بازگشت به بالا</a>
                </div>
            </div>
        </div>
    </footer>

)
}