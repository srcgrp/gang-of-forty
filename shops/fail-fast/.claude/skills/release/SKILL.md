---
name: release
description: Release a new version of the Fail-Fast shop by updating its version and changelog, checking the build, and preparing the deployment.
---

# Release

1. Ask for the target version and one-line summary when they are missing.
2. Run `npm run ci`. Stop and report the error if it fails.
3. Set `version` in `package.json` to the requested version.
4. Add a dated section to the top of `CHANGELOG.md` with Added, Changed, and Fixed entries based on the changes since the previous release.
5. Show `git diff` and wait for approval before committing with `release: <version>`.
6. Provide the subtree split and push commands from the Gang of Forty repository root; do not run them.
7. After the user confirms the push, check the live URL in `shop.json` at 390x844 and report browser console errors and failed requests.
