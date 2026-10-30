import type { AppData, CarouselView } from '../types';
import { renderShop } from './shop';
import { renderHero } from './hero';
import { renderHomeSections } from './catalog';

export const renderPage = (shop: AppData, shelves: CarouselView[]): void => {
  renderShop(shop); renderHero(shop.home); renderHomeSections(shelves, shop.home);
};
