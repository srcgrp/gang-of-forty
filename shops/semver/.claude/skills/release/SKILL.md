---
name: release
description: Prepare a new Nardone release, review the changes with the owner, and verify the live shop after the owner publishes. Use when asked to release or ship a version.
---

# Release Nardone

1. Ask the owner for the version (`x.y.z`) and a one-line release summary if either is missing.
2. From `shops/semver`, run `npm run ci` before preparing the release. If it fails, stop and show the error.
3. Set `version` in `package.json` and keep `package-lock.json` in sync. If both already match, keep the existing values.
4. Add a dated `## [x.y.z] - YYYY-MM-DD` section to the top of `CHANGELOG.md`. Use the release summary and `git log` since the last release to write concrete entries under Added, Changed, and Fixed as applicable. Update the section in place if that version is already listed.
5. Run `npm run ci` and show the exact `git diff`, including new files and any owner-requested changes in the release. Wait for the owner's approval of that diff before making one commit. Use `release: x.y.z` and include the week and step in the message when releasing for the assignment.
6. Prepare a storefront-only export to publish to `amirnasr-dev/semver-shop`. The source is the subtree produced by `git subtree split --prefix=shops/semver` from the Gang of Forty root. Use an isolated copy to exclude `.env*`, `.vercel/`, `node_modules/`, and `dist/` throughout the exported history. Check that the export has the expected storefront files and can fast-forward the published `main`. Give the owner the exact push command for that verified export. The owner runs the production push.
7. After the owner says the push is done, verify that the new GitHub Actions production run succeeded. Open `liveUrl` from `shop.json` with Playwright MCP at `390×844` and wait for products. Report console errors and warnings, and requests that failed or returned a status outside `2xx`. The release is verified when both lists are empty.
