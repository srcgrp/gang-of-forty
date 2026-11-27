  export default function Middle(){
    return(
        <section className="middle" id="middle">
            <div className="broken-window">
                <img className="broken-window-image" src="./images/broken-window.svg" alt=""/>
                <div className="broken-window-details">
                    <h3 className="broken-window-header">یک ایراد کوچیک دیدی؟</h3>
                    <p className="broken-window-subtitle">قبل اینکه بزرگ بشه گزارشش کن</p>
                    <p className="broken-window-text">کالای آسیب دیده؟همون لحظه عوضش میکنیم.</p>
                </div>
                <a href="#phonenumber" className="broken-window-button">گزارش مشکل</a>
            </div>
            <div className="eggs"><img className="eggs-image" src="images/egg.png" alt=""/>
                <div className="eggs-details">
                    <h3 className="eggs-title">تخم مرغ تازه هر روز ساعت ۷ صبح</h3>
                    <p className="eggs-text">مستقیم از مزرعه به سبد شما</p>
                </div>
            </div>
        </section>
    )
  }
  
  
