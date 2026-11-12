import type { Category } from "../types/product.ts";
import type { Home } from "../types/shop.ts";
import CategoryNav from "./CategoryNav.tsx";
import Hero from "./Hero.tsx";
import PromoStrips from "./PromoStrips.tsx";

type HomeIntroProps = {
  home: Home;
  categories: Category[];
  categoryId: number | null;
  onPick: (id: number | null) => void;
};

export default function HomeIntro({
  home,
  categories,
  categoryId,
  onPick,
}: HomeIntroProps) {
  return (
    <>
      <CategoryNav
        categories={categories}
        selectedId={categoryId}
        onPick={onPick}
      />
      <Hero home={home} />
      <PromoStrips home={home} />
    </>
  );
}
