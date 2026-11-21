import type { CartControls } from '../cart-controls';
import type { Category, ShopModel } from '../types';
import type { ReactNode } from 'react';
import { stripEmoji } from './shop-content';
import CategoryNav from './CategoryNav';
import CategoryShelf from './CategoryShelf';
import Hero from './Hero';
import OffersShelf from './OffersShelf';
import Promos from './Promos';

type HomeProps = { model: ShopModel; categories: Category[]; categoryId: number | null; controls: CartControls; onPick: (id: number) => void };

export default function Home({ model, categories, categoryId, controls, onPick }: HomeProps) {
  const shelves: ReactNode[] = [];
  const ids = new Set(['categories', 'contact', 'top', 'main']);
  const covered = new Set<number>();
  function addCategory(id: string, category: Category, title: string) {
    shelves.push(<CategoryShelf key={id} id={id} title={title || category.name} controls={controls}
      category={category} items={model.itemsByCategory.get(category.id) ?? []} />);
    covered.add(category.id);
    ids.add(id);
  }
  for (const section of model.carousels) {
    if (ids.has(section.id)) continue;
    const title = stripEmoji(section.title);
    if (section.source === 'offers') {
      shelves.push(<OffersShelf key={section.id} id={section.id} title={title} controls={controls} items={model.offerItems} />);
      ids.add(section.id);
    } else {
      const category = model.categoryById.get(section.categoryId);
      if (category) addCategory(section.id, category, title);
    }
  }
  for (const category of categories) {
    if (!covered.has(category.id) && !ids.has(category.slug)) addCategory(category.slug, category, category.name);
  }
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