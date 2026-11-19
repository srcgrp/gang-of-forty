import type { Category, ShopModel } from '../types';
import { homeShelves } from '../catalog/home-shelves';
import CategoryNav from './CategoryNav';
import CategoryShelf from './CategoryShelf';
import Hero from './Hero';
import OffersShelf from './OffersShelf';
import Promos from './Promos';

type HomeProps = { model: ShopModel; categories: Category[]; categoryId: number | null };

export default function Home({ model, categories, categoryId }: HomeProps) {
  const shelves = homeShelves(model).map((shelf) => shelf.kind === 'offers'
    ? <OffersShelf key={shelf.id} id={shelf.id} title={shelf.title} items={shelf.items.slice(0, 4)} total={shelf.items.length} />
    : <CategoryShelf key={shelf.id} id={shelf.id} title={shelf.title} emoji={shelf.emoji} items={shelf.items.slice(0, 4)} total={shelf.items.length} />);
  return (
    <>
      <Hero model={model} />
      <CategoryNav categoryId={categoryId} categories={categories} />
      {shelves.slice(0, 1)}
      <Promos promos={model.home.promos} />
      {shelves.slice(1)}
    </>
  );
}
