---
name: release
description: Release a new version of the strategic shop (version, CHANGELOG, checks, deployment, and live-site verification). Use when asked to release or ship.
---

# Release

1. Ask me for the version (`x.y.z`) and a one-line summary if either is missing.
2. Run `npm run ci` in the shop directory. If it fails, stop and show the error.
3. Set `version` in `package.json` to the requested version. If it already matches,
   keep it. Keep the root package metadata in `package-lock.json` consistent.
4. Add a section at the top of `CHANGELOG.md` using
   `## [x.y.z] - YYYY-MM-DD`. Use `git log` for this shop since the previous
   release to write factual Added, Changed, or Fixed entries. For the first
   release, use the shop's history.
5. Show me the complete release diff, including new files and staged changes.
   Stop and wait for my explicit OK. Only then commit: `release: x.y.z`.
6. Show me the publication commands to run from the Gang of Forty root.
   Do not run the subtree or push commands yourself. The course commands are:

   ```bash
   git subtree split --prefix=shops/strategic -b strategic-shop
   git push shop strategic-shop:main
   ```

   Check the existing publication history and branch protection when giving
   me the commands. For protected `main`, give me the release-branch and pull
   request steps. Keep the protection enabled.
7. After I confirm that I pushed and the production deployment succeeded, read
   `liveUrl` from `shop.json`. Open it with the Playwright MCP tools, resize to
   390×844, wait for products, and report Console errors or warnings and failed
   network requests. The release is done when both lists are empty.