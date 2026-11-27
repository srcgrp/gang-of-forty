# Week 7 assistant eval

Run each task twice in fresh assistant sessions on eval-week7-experiment, branched from week7-deploy. Temporarily rename AGENTS.md and CLAUDE.md for the first run, restore them for the second, and reset each task file before the next run. Check the stated condition and npm run ci after each run. Do not merge the experiment branch.

| # | Small task to give the assistant | Executable check after the run |
| --- | --- | --- |
| 1 | Add `aria-live="polite"` to the loading status paragraph in `src/components/LoadStatus.tsx`. | `Select-String -Path src/components/LoadStatus.tsx -Pattern 'aria-live="polite"' -SimpleMatch` returns a match; `npm run ci` passes. |
| 2 | Add `loading="lazy"` to the icon image in `src/components/ProductImage.tsx`. | `Select-String -Path src/components/ProductImage.tsx -Pattern 'loading="lazy"' -SimpleMatch` returns a match; `npm run ci` passes. |
| 3 | Disable browser autofill on the product search field in `src/components/SearchBox.tsx` with `autoComplete="off"`. | `Select-String -Path src/components/SearchBox.tsx -Pattern 'autoComplete="off"' -SimpleMatch` returns a match; `npm run ci` passes. |
| 4 | Set `autoComplete="tel"` on the mobile number field in `src/components/pages/CheckoutPage.tsx`. | `Select-String -Path src/components/pages/CheckoutPage.tsx -Pattern 'autoComplete="tel"' -SimpleMatch` returns a match; `npm run ci` passes. |
| 5 | Add `data-product-id={card.id}` to the product article in `src/components/ProductCard.tsx`. | `Select-String -Path src/components/ProductCard.tsx -Pattern 'data-product-id={card.id}' -SimpleMatch` returns a match; `npm run ci` passes. |

| Task | Without AGENTS.md | With AGENTS.md |
| --- | --- | --- |
| 1 | ✅ | ✅ |
| 2 | ✅ | ✅ |
| 3 | ✅ | ✅ |
| 4 | ✅ | ✅ |
| 5 | ✅ | ✅ |

Without project instructions, 5 of 5 tasks passed the specified checks and npm run ci.
With project instructions, 5 of 5 tasks passed the same checks and npm run ci.
