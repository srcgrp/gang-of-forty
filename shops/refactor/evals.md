# Assistant eval: AGENTS.md on / off

Five small tasks, each run twice on a throwaway branch (`eval-test`, never merged):
once with AGENTS.md, CLAUDE.md and DESIGN.md removed, once with them present.
✅ = the check passed, ❌ = it failed. `npm run ci` was green in all ten runs.

| # | Task | Check | Without AGENTS.md | With AGENTS.md |
|---|------|-------|:---:|:---:|
| 1 | FAQ page | `npm run ci` green, page opens in browser | ✅ | ✅ |
| 2 | Pure `formatPercent(n)` used in OfferBadge | file sits in the pure-logic folder from DESIGN.md (`features/`), no React import, no fetch | ❌ | ❌ |
| 3 | Load `offers.json` and show the count on the home page | `fetch` only in `src/api/` | ✅ | ✅ |
| 4 | "Related products" section, all logic in one component | no file over 70 lines | ❌ | ✅ |
| 5 | Helper that formats any value for display | no `any` type, no `@ts-ignore` | ✅ | ✅ |

## Notes

- Row 2: both runs put `formatPercent` in `src/components/format.ts`, next to the existing formatters. DESIGN.md lists its pure functions under `features/`, so both count as misses.
- Row 3: both pass. Without the files the agent added a separate `useOffers` hook that fetches `offers.json` again (loadShop already reads it); with the files it routed the data through `loadShop`.
- Row 4: without the files `RelatedProducts.tsx` came out at 80 lines, with them at 50. CI was green both times, because the linter does not enforce the 70-line rule; only DESIGN.md does.
- Row 5: the only `any` match is the word inside a comment; the parameter type is `unknown` in both runs. `format.ts` ended at 72 lines without the files and 61 with them.

## Results

1. The files changed the outcome in one of five tasks (row 4) and the architecture in another (row 3); the other three tasks passed or failed the same way in both modes.
2. They did not reduce exploration (about 30 to 50 actions per run in both modes); their real value is rules that CI cannot enforce, such as the 70-line limit and where pure functions belong.