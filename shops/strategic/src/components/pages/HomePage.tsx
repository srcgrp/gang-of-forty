import { useSearch } from '@tanstack/react-router';
import { useCatalog } from '../../hooks/useCatalog';
import { selectionView } from '../../features/products/selection';
import Home from '../Home';
import Catalog from '../Catalog';
import LoadStatus from '../LoadStatus';

export default function HomePage() {
  const state = useCatalog();
  const { q = '', category: slug } = useSearch({ from: '/' });
  if (state.status !== 'success' && state.status !== 'empty') {
    return <LoadStatus state={state} onRetry={state.retry}>{null}</LoadStatus>;
  }
  const model = state.data;
  const category = slug ? model.categoryBySlug.get(slug) : undefined;
  if (q || category) {
    const result = selectionView(model, category?.id ?? null, q);
    return <Catalog title={result.title} category={category} items={result.items} />;
  }
  return (
    <>
      {state.status === 'empty' && <LoadStatus state={state} onRetry={state.retry}>{null}</LoadStatus>}
      <Home model={model} categories={[...model.categories].sort((a, b) => a.id - b.id)} categoryId={null} />
    </>
  );
}
