import { useEffect, useState } from 'react';
import type { ShopModel } from '../types';
import { goToUrl, readQuery, readRoute, watchRoute, writeQuery } from '../storage/url-state';
import { routeSelection } from '../catalog/route-selection';

export function useShopNavigation(model: ShopModel) {
  const [route, setRoute] = useState(readRoute);
  const [query, setQuery] = useState(readQuery);
  useEffect(() => watchRoute(() => {
    setRoute(readRoute());
    setQuery(readQuery());
  }), []);
  function navigate(href: string) {
    goToUrl(href);
    setRoute(readRoute());
    setQuery(readQuery());
  }
  function search(text: string) {
    const value = text.trim() ? text : '';
    setQuery(value);
    writeQuery(value);
    setRoute(readRoute());
  }
  return { ...routeSelection(model, route), query, navigate, search };
}
