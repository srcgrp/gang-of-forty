---
name: release
description: Prepare a MARTO release, review the version and changelog, and verify the live storefront after the owner publishes it.
---

# Release MARTO

1. Get the release version and a one-line summary from the owner if missing.
2. Run `npm run ci` in the shop directory. Report any failure before proceeding.
3. Set the version in `package.json` and sync both version fields in `package-lock.json`.
4. Add a dated entry to `CHANGELOG.md` with relevant Added, Changed or Fixed items from the shop's Git history.
5. Show the diff and wait for the owner's approval before committing as `release: <version>`.
6. Give the owner the publishing commands from the Gang of Forty root. The owner runs the push.

   ```sh
   git subtree split --prefix=shops/dry -b dry-shop
   git push shop dry-shop:main
   ```

7. After the owner publishes, use Playwright MCP at 390 × 844 on the production URL in `shop.json`. Wait for products and report console warnings/errors and non-2xx requests. Save a full-page capture to `docs/mobile.png` once both lists are empty.
