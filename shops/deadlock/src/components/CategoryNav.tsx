export default function CategoryNav (){
    return (
        <>
            <section className="category" id="categories">
                <h2 className="titels">دسته بندی ها</h2>
                <div className="carousel">


                    <a href="#tents" className="Categories">
                        <img src="images/camping-svgrepo-com.svg" alt="چادر"/>
                        <h3>چادر</h3>
                    </a>
                    <div className="Categories">
                        <img src="images/camping-gas-2.svg" alt="گاز"/>
                        <h3>گاز</h3>
                    </div>
                    <div className="Categories">
                        <img src="images/camping-flash-flashlight-svgrepo-com.svg" alt="چراغ قوه"/>
                        <h3>چراغ قوه</h3>
                    </div>
                    <div className="Categories">
                        <img src="images/camping-chair-svgrepo-com.svg" alt="صندلی"/>
                        <h3>صندلی</h3>
                    </div>
                    <div className="Categories">
                        <img src="images/camping-backpack-svgrepo-com.svg" alt="کوله پشتی" id="koole"/>
                        <h3>کوله پشتی</h3>
                    </div>
                    <a href="#coffee-gear" className="Categories">
                        <img src="images/spiral-32-svgrepo-com.svg" alt="آیکون دسته‌بندی قهوه‌ساز سفری"/>
                        <h3>قهوه‌ساز</h3>
                    </a>
                </div>
            </section>
        </>
    )
}