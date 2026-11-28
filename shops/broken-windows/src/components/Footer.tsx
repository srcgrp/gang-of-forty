import FooterInfo from "./FooterInfo"
import FooterCategories from "./FooterCategories"
import FooterContact from "./FooterContact"
import FooterOpenHours from "./FooterOpenHours"
import FooterBottom from "./FooterBottom"
import type { Category } from "../types.ts";
type Props = {
  categories: Category[];}
export default function Footer({categories}:Props){
    return(<footer id="footer">
        <div className="footer">
            <div className="footer-top">
                <FooterInfo/>
                <FooterCategories categories={categories} />
                <FooterContact/>
               <FooterOpenHours/>
               </div>
            <FooterBottom/>
        </div>
    </footer>

)
}