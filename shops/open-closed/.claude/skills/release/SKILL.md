---
name: release
description: Release a new version of this shop (bump version, CHANGELOG, checks, push to open-close-shop, check the live site). Use when asked to release or ship.
---

# Release

1. Ask me for the version (x.y.z) and a one-line summary if I did not give them.
2. Run `npm run ci`. If it fails, stop and show the error.
3. Set "version" in package.json to x.y.z.
4. Add a section to the top of CHANGELOG.md: `## [x.y.z] - YYYY-MM-DD` with Added / Changed / Fixed lines from `git log --oneline -- .` since the last release (only this shop folder).
5. Show me `git diff` and wait for my OK. Then commit: `release: x.y.z`.
6. Tell me the push commands (from the Gang of Forty root), do not run them yourself:
   git subtree split --prefix=shops/open-closed -b open-closed-shop
   git push shop open-closed-shop:main
7. After I say it is pushed: open the live URL from shop.json with the playwright MCP tools, at 390x844,
   and report Console errors and failed requests. Done = both lists empty.