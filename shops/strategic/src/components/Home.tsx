import type { Category, ShopModel } from '../types';
import { homeShelves } from '../catalog/home-shelves';
import { stripEmoji } from './shop-content';
import CategoryNav from './CategoryNav';
import CategoryShelf from './CategoryShelf';
import Hero from './Hero';
import OffersShelf from './OffersShelf';
import Promos from './Promos';

type HomeProps = { model: ShopModel; categories: Category[]; categoryId: number | null; onPick: (id: number) => void };

export default function Home({ model, categories, categoryId, onPick }: HomeProps) {
  const shelves = homeShelves(model).map((shelf) => shelf.kind === 'offers'
    ? <OffersShelf key={shelf.id} id={shelf.id} title={stripEmoji(shelf.title)} items={shelf.items} />
    : <CategoryShelf key={shelf.id} id={shelf.id} title={stripEmoji(shelf.title) || shelf.category.name} category={shelf.category} items={shelf.items} />);
  return (
    <>
      <Hero model={model} />
      <CategoryNav categoryId={categoryId} categories={categories} onPick={onPick} />
      {shelves.slice(0, 1)}
      <Promos promos={model.home.promos} />
      {shelves.slice(1)}
    </>
  );
}
