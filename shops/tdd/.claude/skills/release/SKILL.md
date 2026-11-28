---
name: release
description: Release a new Sam Market version. Use when asked to release or ship the shop.
---

# Release

1. Ask for the version and a one-line summary if either is missing.
2. Run `npm run ci` from the shop folder. If it fails, stop and show the error.
3. Set the version in `package.json` and sync `package-lock.json` if it changes.
4. Add `## [x.y.z] - YYYY-MM-DD` at the top of `CHANGELOG.md`. Review `git log` since the last release and list actual changes under Added, Changed or Fixed.
5. Show the diff and wait for my OK. Run `npm run ci` on the final changes, then commit as `release: x.y.z`.
6. From the Gang of Forty root, prepare the shop branch with `git subtree split --prefix=shops/tdd -b tdd-shop`. Check that the update is fast-forward. Give me `git push shop tdd-shop:main` to run myself.
7. After I confirm the push, open the production URL from `shop.json` with Playwright MCP at 390×844. Wait for products and report console errors and failed requests. Both lists must be empty.
