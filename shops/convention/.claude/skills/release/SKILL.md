---
name: release
description: Prepare a versioned Convention shop release and verify its live deployment when the owner asks to release, ship or publish.
---

# Release Convention

1. Ask for the x.y.z version and a one-line summary if either is missing. Work in the Convention shop.
2. Run `npm run ci`. On failure, report the failing check and stop the release.
3. Run `npm version <version> --no-git-tag-version --allow-same-version`. Confirm the package and lockfile agree.
4. Read the shop's Git history since the preceding release. Prepend a dated `## [x.y.z] - YYYY-MM-DD` section to CHANGELOG.md with the actual additions, changes and fixes. Reuse the entry when retrying.
5. Review the release files and run CI again. Show the owner the full release diff, including new files. Wait for an explicit OK for this version. After approval, commit only the reviewed release files as `release: x.y.z`.
6. Give the owner these PowerShell commands to run at the Gang of Forty root. The owner pushes to production. Use the existing `shop` remote for the personal convention-shop repo. Respect branch protection and use the approved PR process if a direct push is restricted.

   ```powershell
   $shopCommit = git subtree split --prefix=shops/convention HEAD
   if ($LASTEXITCODE -eq 0) { git push shop "${shopCommit}:refs/heads/main" }
   ```

7. After the owner confirms the push, read the actual production URL from shop.json. Use Playwright MCP to navigate, resize to 390×844 and wait for product cards. List Console errors and warnings and every failed or non-2xx request. Save the full-page capture to docs/mobile.png. Report the workflow run and both lists. Finish when the production checks pass.
