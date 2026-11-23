 import type { Category } from "../types.ts";
import { Link } from "@tanstack/react-router";
type Props = {
  categories: Category[];}
 export default function FooterCategories({categories}:Props){
    return(
    <div className="footer-top-categories">
                    <h4 className="footer-top-header">دسته ها</h4>
                    <ul className="footer-top-categories-list" id="footer-categories">
{categories.map((c)=>( <li className="footer-top-categories-list-item" key={c.id}>
<Link  to="/plp/$carouselId"
                  params={{ carouselId: c.slug }}
                  search={{ sort: "default" }}>  {c.name }</Link>
               </li>))}

                    </ul>
                </div>
    )
 }

