---
name: release
description: Release a new version of the rate-limit shop (bump version, update CHANGELOG, run CI checks, publish to rate-limit-shop, and verify the live site). Use when asked to release or ship.
---

# Release

1. Ask me for the version (x.y.z) and a one-line summary if I did not provide them.
2. Run `npm run ci`. If it fails, stop and show the error.
3. Update the version in `package.json` and synchronize `package-lock.json`.
4. Add a section to the top of `CHANGELOG.md`: `## [x.y.z] - YYYY-MM-DD` with Added, Changed, and Fixed entries based on `git log` since the last release.
5. Show me `git diff` and wait for my explicit approval. Only after approval, commit with the message `release: x.y.z`.
6. Tell me the following commands to run from the gang-of-fourty repository root. Do not execute them yourself:

   ```bash
   git subtree split --prefix=shops/rate-limit -b rate-limit-shop
   git push shop rate-limit-shop:main
   ```

   If main is protected, provide instructions for publishing through a pull request instead. Never bypass branch protection or force push.
7. After I confirm that the release is deployed, open the live URL from `shop.json` using the Playwright MCP tools at 390x844. Wait until the products are visible, then report all console errors and failed network requests.

The release is complete only when both lists are empty.

Never push or deploy without my involvement. Never claim verification succeeded if the required tools were unavailable.

## Release Workflow

For a release, follow
.agents/skills/release/SKILL.md step by step.
Never skip the user approval step.
Never push or deploy automatically.