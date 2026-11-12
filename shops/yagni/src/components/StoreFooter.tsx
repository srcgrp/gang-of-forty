import type { Categories, Shop } from "../types";
import FooterColumns from "./footer/FooterColumns";
import FooterBottom from "./footer/FooterBottom";

interface StoreFooterProps { shop: Shop; categories: Categories }

export default function StoreFooter({ shop, categories }: StoreFooterProps) {
  return (
    <footer className="site-footer anchor-section" id="footer">
      <div className="footer-container">
        <FooterColumns shop={shop} categories={categories} />
        <FooterBottom copyright={shop.copyright} />
      </div>
    </footer>
  );
}
