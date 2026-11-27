---
name: release
description: Release a new version of this shop (bump version, CHANGELOG, checks, push to sabzkaleh-shop, check the live site). Use when asked to release or ship.
---

# Release Procedure — Sabzkaleh (sabzkaleh-shop)

Follow every step below in order. Never skip CI validation and never perform the final production push automatically.

## Step 1: Gather Release Inputs
If the user has not provided both a target semantic version (e.g., `1.0.1`) and a one-line release summary, ask for them before editing any files.

## Step 2: Run Local CI Checks
Run the full local CI pipeline:
```bash
npm run ci
```
This executes `npm run lint && npm run check && npm run build`.

## Step 3: Stop Immediately If CI Fails
If `npm run ci` exits non-zero, **stop the release process immediately**, report the exact lint, TypeScript, or build failure, and do not bump versions or update `CHANGELOG.md`.

## Step 4: Update `package.json` Version
Update `"version"` in `package.json` to the requested release version (keeping `"week": 7` intact).

## Step 5: Update `CHANGELOG.md`
Add a new section at the top of `CHANGELOG.md` using the current date (`YYYY-MM-DD`):
```markdown
## [<version>] - <YYYY-MM-DD>

### Added
- ...

### Changed
- ...

### Fixed
- ...
```
Only include real changes actually present in the release. Never fabricate entries.

## Step 6: Inspect Changes (`git diff`)
Show the user the exact `git diff` of `package.json`, `CHANGELOG.md`, and any release-related files.

## Step 7: Wait for User Approval
Stop and explicitly ask the user to review the diff and confirm they approve the release preparation.

## Step 8: Never Push Automatically
**CRITICAL:** NEVER run `git push`, create PRs, merge branches, or trigger production deploys on the user's behalf. Leave the final production push strictly to the human maintainer.

## Step 9: Provide Exact Manual Push Commands
Provide the exact commands for the user to run manually:

If pushing directly from the standalone `sabzkaleh-shop` repository:
```bash
git add package.json CHANGELOG.md
git commit -m "chore(release): v<version> - <one-line summary>"
git tag -a v<version> -m "Release v<version>"
git push origin main --follow-tags
```

If syncing from the Gang of Forty monorepo root using `git subtree`:
```bash
git add shops/sabzkaleh/package.json shops/sabzkaleh/CHANGELOG.md
git commit -m "chore(sabzkaleh): release v<version> - <one-line summary>"
git subtree push --prefix=shops/sabzkaleh sabzkaleh-shop main
```

## Step 10: Post-Push Live Site Verification (Playwright MCP)
After the user confirms that the push and GitHub Actions `deploy` job succeeded, open the real production URL (`liveUrl` in `shop.json`) using Playwright MCP.

## Step 11: Validate at Mobile Viewport (`390x844`)
Using Playwright MCP on the real production URL:
1. Open the production URL.
2. Resize the browser viewport to `390x844`.
3. Wait until products are visible in the DOM.
4. Capture a full-page screenshot and save it to `docs/mobile.png` when requested for release documentation.

## Step 12: Report Real Console & Network Results
Inspect and report the real counts observed from Playwright MCP:
- Console errors (must be `0`)
- Console warnings (must be `0`)
- Failed network requests (must be `0`)
- Products visible (`YES` / `NO`)

Never fabricate or guess any Playwright MCP output. If any error, warning, or failed request is observed, stop and report it immediately.
