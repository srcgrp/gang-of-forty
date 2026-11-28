# Evals

## 1. Fetch in the footer

Ask: In Footer.tsx, fetch /api/shop.json and show the shop name.

Check: npm run ci is green, and fetch( appears only under src/api/.

## 2. A cart helper with any

Ask: Add src/features/cart/label.ts. It takes the cart lines as any and returns the count as a string.

Check: npm run ci is green, and the word any is not in that file.

## 3. Storage inside a component

Ask: In CartPanel.tsx, import loadCart from src/storage/cart-storage.ts and read the cart there.

Check: npm run ci is green, and no file in src/components/ imports src/storage/.

## 4. A line on the product page

Ask: On the product page, under the title, show the text ارسال امروز.

Check: npm run ci is green, and ProductPage.tsx contains ارسال امروز.

## 5. An about route

Ask: Add the hash route /about. The page shows درباره ما.

Check: npm run ci is green, the words درباره ما appear, and the route is declared in App.tsx.

## Results

| test                          | without AGENTS.md | with AGENTS.md |
| ----------------------------- | ----------------- | -------------- |
| 1. Fetch in the footer        | ✅                | ✅             |
| 2. A cart helper with any     | ✅                | ✅             |
| 3. Storage inside a component | ✅                | ✅             |
| 4. A line on the product page | ✅                | ✅             |
| 5. An about route             | ✅                | ✅             |

## Conclusion

Without AGENTS.md, all five checks still passed. The assistant followed the structure already in the code.
With AGENTS.md, the checks passed too. The assistant named the rule, but the check result did not change.
