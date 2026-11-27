# Bonus #4 — Real Production Rollback Exercise (`1.0.0 -> 1.0.1 -> git revert -> 1.0.2`)

> **Status:** `MANUAL ACTION REQUIRED`
> **Important:** This rollback must be executed against the real `main` deployment so you obtain real timestamps and real GitHub Actions / Vercel URLs. Do NOT fabricate URLs or timestamps.

---

## Overview

```text
1.0.0 (initial Week 7 production release)
  -> 1.0.1 (release containing a small, intentional controlled bug)
  -> deploy 1.0.1 to production
  -> detect the bug on live site
  -> git revert <bad-1.0.1-commit-sha>
  -> 1.0.2 (fixed production release)
  -> verify fixed production deployment
```

---

## Step-by-Step Commands (From Gang of Forty Repository Root)

Assuming your shop lives at `shops/sabzkaleh` and remote `sabzkaleh-shop` points to `https://github.com/<user>/sabzkaleh-shop.git`:

### 1. Confirm `1.0.0` Is Deployed & Record Evidence
1. Push `shops/sabzkaleh` (`1.0.0`) to `sabzkaleh-shop` `main`:
   ```bash
   git subtree push --prefix=shops/sabzkaleh sabzkaleh-shop main
   ```
2. Record:
   - `1.0.0` Timestamp: `<YYYY-MM-DD HH:MM UTC>`
   - `1.0.0` GitHub Actions Run URL: `<url>`
   - `1.0.0` Live Deployment URL: `<url>`

### 2. Introduce a Controlled Bug & Release `1.0.1`
Pick a safe, easily detectable visual/behavior bug that still passes `npm run ci` (for example, temporarily changing the top notice or currency label, or breaking a non-type-checked CSS/copy behavior — e.g. displaying `"تومان (TEST BUG)"` or hiding the hero CTA label).

1. Apply the controlled bug inside `shops/sabzkaleh/`.
2. Update `shops/sabzkaleh/package.json` version to `"1.0.1"`.
3. Add `## [1.0.1]` to `shops/sabzkaleh/CHANGELOG.md` (template below).
4. Run `npm --prefix shops/sabzkaleh run ci` to confirm CI passes.
5. Commit and push `1.0.1`:
   ```bash
   git add shops/sabzkaleh
   git commit -m "chore(sabzkaleh): release v1.0.1 (controlled bug test)"
   git subtree push --prefix=shops/sabzkaleh sabzkaleh-shop main
   ```
6. Wait for `deploy` to finish, open the live URL, and **detect the bug** (record screenshot/observation).
7. Record:
   - `1.0.1` Commit SHA: `<sha>`
   - `1.0.1` Timestamp: `<YYYY-MM-DD HH:MM UTC>`
   - `1.0.1` GitHub Actions Run URL: `<url>`
   - `1.0.1` Live Deployment URL: `<url>`

### 3. Revert the Controlled Bug & Release `1.0.2`
1. Revert the `1.0.1` commit cleanly using `git revert`:
   ```bash
   git revert --no-commit <1.0.1-commit-sha>
   ```
2. Update `shops/sabzkaleh/package.json` version to `"1.0.2"`.
3. Add `## [1.0.2]` to `shops/sabzkaleh/CHANGELOG.md` documenting the revert and fix.
4. Run `npm --prefix shops/sabzkaleh run ci` and verify zero errors.
5. Commit and push `1.0.2`:
   ```bash
   git add shops/sabzkaleh
   git commit -m "fix(sabzkaleh): revert v1.0.1 controlled bug and release v1.0.2"
   git subtree push --prefix=shops/sabzkaleh sabzkaleh-shop main
   ```
6. Wait for `deploy` to finish, verify the live production site is fixed (Playwright MCP `390x844`), and record:
   - `1.0.2` Timestamp: `<YYYY-MM-DD HH:MM UTC>`
   - `1.0.2` GitHub Actions Run URL: `<url>`
   - `1.0.2` Live Deployment URL: `<url>`

---

## `CHANGELOG.md` Templates for `1.0.1` and `1.0.2`

Once you execute steps 2 and 3, prepend these real sections (with real dates and actual bug description) to `CHANGELOG.md`:

```markdown
## [1.0.2] - YYYY-MM-DD

### Fixed
- Reverted the controlled bug introduced in `1.0.1` via `git revert <sha>` and restored expected production storefront behavior.

## [1.0.1] - YYYY-MM-DD

### Changed
- Prepared `1.0.1` test release with an intentional controlled bug for production rollback verification.
```
