Convention now supports a multi-page grocery store with persistent shared theme/cart state. Home previews lead to complete product lists, and the bonus routes provide product details, URL sorting and validated checkout.

## Definition of Done

- [x] shop.json has week 6; TanStack Router and Zustand installed; lint denies warnings.
- [x] Theme store uses persist, Header toggle and Layout data-theme/CSS variables; survives refresh.
- [x] Shared Zustand cart reuses pure cart functions and storage layer; no cart prop drilling; derived count/total.
- [x] useCatalog owns loading and retry; App contains routes only, without useState/useEffect.
- [x] Typed hash history, Register declaration, Layout/Outlet, home, PLP and NotFound.
- [x] Every home carousel has a full-list link with count; PLP reads useParams and reuses ProductCard.
- [x] Unknown list IDs display a list-specific message; unknown paths display NotFound.
- [x] All pages are inside src/components/pages and below 70 lines.
- [x] Production preview retains route, theme, cart and sort after refresh; Back/Forward work.
- [x] TypeScript, lint, build, HTML validation and domain tests pass; browser runtime has no errors.
- [x] DESIGN.md documents route/store tables and component trees; real React DevTools evidence included.
- [x] PR changes only shops/convention; generated outputs and local dependencies are excluded.

The missing `node scripts/check-shop.mjs convention` was explicitly waived by the owner.
There is no fabricated output for this unavailable check.

## Bonuses

- [x] Product detail /product/$productId, typed card title links, add action and invalid-ID message.
- [x] PLP validateSearch and immutable ascending price sorting; default/price stored in URL.
- [x] memo ProductCard and store selectors: adding to cart renders Header/CartPanel and their children, with no PLP or ProductCard render.
- [x] Controlled checkout with name/mobile/address; derived errors after first submit; useRef focus; clear persisted cart and navigate home with replace.

## Validation

Commands run from shops/convention:

```text
npm run check       PASS
npm run lint        PASS (zero warnings)
npm test            PASS (4 tests)
npm run build       PASS
npm exec --yes --package=html-validate@9 -- html-validate index.html
```

Nineteen production-preview browser checks, including simulated API failure/retry, malformed/empty data, routing fallbacks, sorting, mobile layout and checkout, are recorded in [browser-checks.json](shops/convention/evidence/browser-checks.json). Intentionally invalid route/sort probes produce TS2820/TS2322 and were removed; output is in evidence/typecheck-probe.txt.

## Design decisions

The cart uses Zustand: stable action selectors and a separate derived count selector prevent unrelated card/page renders. `useThemeStore()` subscribes to the entire store; `useThemeStore(s => s.theme)` subscribes only to theme changes. Routes are declared in App because it is the architecture entry point allowed to import pages. Pages use `useParams({ from })` and `useSearch({ from })` without importing App, preserving type safety without an import cycle.

The former remote development proxy returned HTTP 502. Vite development/preview now reads the repository API JSON through a read-only middleware. Deployment retains the shop-relative ../../api path; shared API files match main.

Refresh example: `shops/convention/#/plp/dairy?sort=price`.

## React DevTools evidence

![Recorded add-to-cart commit](shops/convention/evidence/profiler-add-to-cart.png)

![PLP component inspection](shops/convention/evidence/components-plp.png)

The selected commit identifies Header and CartPanel as update initiators. The cart count and cart lines changed; ProductCard's stable add selector did not change, so memoized cards and PLP were skipped. Raw measured timings are in evidence/profiler-summary.json; component inspection is in evidence/components-inspection.json.

DevTools 8's optional hook-change descriptions throw an `Unknown Fiber` exception with this renderer. The actual flamegraph and commit initiators were captured with that option off. This affects only the temporary ignored verification viewer, not the app or production console.
