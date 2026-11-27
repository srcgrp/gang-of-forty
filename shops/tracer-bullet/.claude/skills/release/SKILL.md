---
name: release
description: Release a new version of Tracer Bullet (version, CHANGELOG, checks, push to tracer-bullet-shop, check the live site). Use when asked to release or ship.
---

# Release

1. Ask me for the version (x.y.z) and a one-line summary if I did not give them.
2. Run `npm run ci`. If it fails, stop and show the error.
3. Set "version" in package.json to x.y.z.
   Keep package-lock.json consistent if the version changes.
   If the current version already matches, leave it unchanged.
4. Add a section to the top of CHANGELOG.md:
   `## [x.y.z] - YYYY-MM-DD`
   Include Added / Changed / Fixed entries based on the actual git log since the last release.
   For the first release, review the shop's relevant project history.
   Do not invent changes.
5. Run `npm run ci` again. If it fails, stop.
   Show me the full git diff, including new files, and wait for my explicit approval.
   Only after approval, commit: `release: x.y.z`.
6. Tell me the push commands from the Gang of Forty root.
   Do not run them yourself:

   git subtree split --prefix=shops/tracer-bullet -b tracer-bullet-shop
   git push shop tracer-bullet-shop:main

   If the generated subtree branch already exists and cannot be updated,
   tell me to inspect it before recreating it.
   Never force push.
7. After I confirm the push and successful deployment:
   Open the live URL from shop.json using Playwright MCP at 390x844.
   Wait until products are visible.
   Report Console errors and warnings and all non-2xx network requests.
   Done = both lists empty.