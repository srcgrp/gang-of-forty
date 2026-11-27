---
name: release
description: Release a new version of the idempotency shop (bump version, CHANGELOG, checks, publish via pull request, and verify the live site). Use when asked to release or ship.
---

# Release

1. Ask me for the version (x.y.z) and a one-line summary if I did not give them.

2. Run `npm run ci` from `shops/idempotency`. If it fails, stop and show the error.

3. Set `"version"` in `package.json` to x.y.z. Keep `package-lock.json` consistent if necessary.

4. Add a section to the top of `CHANGELOG.md`:
   `## [x.y.z] - YYYY-MM-DD`
   Include Added / Changed / Fixed lines based on `git log` since the last release.

5. Show me `git diff` and wait for my explicit OK before committing. Then commit with the message `release: x.y.z`.

6. Explain the commands to publish from the Gang of Forty repository root. Do not run push commands yourself.

   The standalone repository is `Baran-06/idempotency-shop`, and its `main` branch is protected.

   Use `git subtree split --prefix=shops/idempotency` to prepare a new release branch, push that branch to the `shop` remote, and create a pull request into `main`.

   Do not push directly to `shop/main`. Wait for the required `check` job to pass and ask me to approve the merge.

7. After I confirm that the release is published, open the live URL from `shop.json` with the Playwright MCP tools at 390x844.

   Report all Console errors and warnings and all failed network requests in two separate tables.

   Done = both lists are empty.

Never commit without my approval. Never push, merge, or deploy without my explicit action.
