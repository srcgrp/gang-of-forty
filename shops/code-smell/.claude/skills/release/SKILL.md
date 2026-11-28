---
name: release
description: Release a new version of the Code Smell shop. Use when asked to release or ship the shop.
---

# Release

1. Ask for the version (`x.y.z`) and a one-line release summary if either is missing.
2. Run `npm run ci` from `shops/code-smell`. If it fails, show the error and stop.
3. Set the version in `package.json`. If the version changes, update `package-lock.json` to match.
4. Add `## [x.y.z] - YYYY-MM-DD` at the top of `CHANGELOG.md`. Write the relevant Added, Changed, and Fixed entries based on the release summary and Git history.
5. Run `npm run ci` again and show the diff, including any new files. Wait for the user's approval, then commit only the approved files with the message `release: x.y.z`.
6. Give the user these commands to run from the Gang of Forty repository root:
   - `git subtree split --prefix=shops/code-smell -b code-smell-shop`
   - `git push shop code-smell-shop:main`
7. Once the user confirms the push and Production deploys, open `liveUrl` from `shop.json` with Playwright MCP at 390 × 844. Wait for products to appear, then report Console errors and warnings and any failed or non-2xx Network requests. The check passes when both lists are empty.