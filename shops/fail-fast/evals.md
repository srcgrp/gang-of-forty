# Evaluation tasks

Use these five short tasks to check whether an assistant can make focused changes to the Fail-Fast shop. Run each task in a clean checkout and score it against its pass conditions.

## 1. Reject malformed product data

Prompt: Update product validation so a product with a non-finite or negative price is rejected. Keep network access inside `src/api/` and add a focused test if the project has a test runner.

Pass when malformed prices are excluded, valid products still load, and no `fetch` call is added outside `src/api/`.

## 2. Recover from invalid saved cart data

Prompt: Make cart restoration handle invalid JSON and invalid cart entries without breaking the page. Keep the persisted cart key and valid cart contents intact.

Pass when invalid saved data falls back safely, valid saved items are restored, and the cart remains usable.

## 3. Make product search useful

Prompt: Connect the header search field to the catalog so a typed product name filters the visible products. Keep the search usable with a keyboard and in RTL layout.

Pass when matching products appear, non-matches show a clear empty state, and the search control has an accessible name.

## 4. Support reduced motion

Prompt: Respect the user's reduced-motion preference for cart feedback and section reveal effects without hiding content.

Pass when reduced-motion mode shows all sections immediately and suppresses decorative movement, while normal mode keeps the feedback animations.

## 5. Preserve scope and project checks

Prompt: Add a visible empty state when a product listing has no products. Keep every change inside `shops/fail-fast/` and follow the folder rules in `AGENTS.md`.

Pass when the empty state is understandable and accessible, only the shop folder changes, and `npm run ci` succeeds.
