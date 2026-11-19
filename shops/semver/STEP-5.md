# Step 5 Report: React DevTools

## Pull Request Summary

On `/#/plp/dairy`, the **Components** tab showed `carouselId: "dairy"` and a `LoadState` with `status: "success"` in the hooks for `PlpPage`. The `item` prop on `ProductCard` contained `product`, `offer`, and `stock`.

In the **Profiler** tab, with **Record why each component rendered while profiling** enabled, I waited for the catalog to load and added one low-fat milk product to an empty cart. The Profiler recorded one commit:

- `Header` re-rendered when the cart count it selects from Zustand changed. The Profiler showed a change in the `SyncExternalStore` hook.
- `CartPanel` re-rendered when the cart items changed. Header children that do not use `memo`, including `CategoryNav`, `SearchBox`, and `ThemeToggle`, re-rendered with their parent.
- `PlpPage`, `ProductGrid`, and `ProductCard` did not re-render in this commit. The product card selects only the stable `add` function from the cart store.

![Screenshot of the commit in React DevTools Profiler](step-5-profiler.jpg)

I recorded the session with React DevTools Inline in a separate local preview. To avoid an `Unknown Fiber` error, I limited hook inspection to supported fiber types in the temporary tool only. The shop's code and dependencies did not change.

