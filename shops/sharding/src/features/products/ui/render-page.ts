import type { Shop, Home, Category, Product, LoadState, ShelfView } from '../../../shared/types';
import { renderHeaderParts } from './header';
import { renderHero } from '../../../shared/ui/hero';
import { renderFooter } from '../../../shared/ui/footer';
import { renderCategories } from './categories';
import { renderProducts } from './products-section';
import { hideSlowNotice } from '../../../shared/ui/slow-notice';
import { setupCarouselControls } from '../../../shared/ui/carousel-controls';
import { startHeroVideo } from '../../../shared/ui/hero-video';
import { hideSkeletons } from '../../../shared/ui/skeleton';

export type PageView = {
  shop: Shop | null;
  home: Home | null;
  categories: Category[];
  products: Product[];
  res: LoadState;
  shelves: ShelfView[];
  banners: string[];
  promos: Record<string, string>;
};

export function renderPage(v: PageView): void {
  renderHeaderParts(v.shop, v.products.length, v.categories, v.products, v.promos);
  renderHero(v.home, v.banners);
  renderFooter(v.shop, v.categories);
  renderCategories(v.categories);
  renderProducts(v.res, v.shelves);
  hideSlowNotice();
  setupCarouselControls();
  startHeroVideo();
  
  if (!v.shop) hideSkeletons();
  if (!v.shop && !v.home) document.body.dataset.state = 'error';
  if (v.shop) document.title = `${v.shop.name} | ${v.shop.slogan}`;
}