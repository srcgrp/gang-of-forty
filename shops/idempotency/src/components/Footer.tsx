import FooterAbout from "./FooterAbout";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";

import type { Shop } from "../shared/types/shop";
import type { Category } from "../shared/types/products";

type Props = {
  shop: Shop | null;
  categories: Category[];
  onPickCategory: (id: number | null) => void;
};

export default function Footer({ shop, categories, onPickCategory }: Props) {
  const copyright = shop
    ? shop.copyright.replace(shop.name, "تازه‌خانه")
    : "© ۱۴۰۵ تازه‌خانه";

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <FooterAbout shop={shop} />

        <FooterLinks
          categories={categories}
          help={shop?.help ?? []}
          onPickCategory={onPickCategory}
        />

        <FooterContact shop={shop} />
      </div>

      <div className="footer-bottom">
        <p>{copyright}</p>
        <a href="#top">بازگشت به بالا ↑</a>
      </div>
    </footer>
  );
}
