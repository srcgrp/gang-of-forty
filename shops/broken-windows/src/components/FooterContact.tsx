export default function FooterContact(){
    return(
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
    )
}