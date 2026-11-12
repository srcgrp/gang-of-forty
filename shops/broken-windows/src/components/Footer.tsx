import FooterInfo from "./FooterInfo"
import FooterCategories from "./FooterCategories"
import FooterContact from "./FooterContact"
import FooterOpenHours from "./FooterOpenHours"
import FooterBottom from "./FooterBottom"
export default function Footer(){
    return(<footer id="footer">
        <div className="footer">
            <div className="footer-top">
                <FooterInfo/>
                <FooterCategories />
                <FooterContact/>
               <FooterOpenHours/>
               </div>
            <FooterBottom/>
        </div>
    </footer>

)
}