---
name: release
description: Prepare a release of the Batshop composition shop and verify the live deployment after the user confirms the push. Use when asked to release or ship.
---

# Release Batshop

1. Ask the user for the release version and a short summary if either is missing. Wait for the missing information.
2. From `shops/composition`, run `npm run ci`. If it fails, stop and show the error before making any release edits.
3. If the requested version differs from the current version, update `package.json` and `package-lock.json` consistently without creating a Git tag or commit. If the version already matches, leave both files unchanged.
4. Review the shop's commits since the previous release with `git log --oneline <previous-release-ref>..HEAD -- .`. For a first release, use `git log --oneline -- .`. Add a versioned, dated (`YYYY-MM-DD`) section at the top of `CHANGELOG.md` with concrete entries under Added, Changed, and Fixed based on the commits. Use the user's summary for context. Include only entries supported by the log and omit empty categories. A first release still needs specific changes from its history. Preserve existing entries.
5. Show the user the `git diff` for the release files, including a `git diff --no-index` for a new, untracked changelog. Wait for the user's explicit OK.
6. After the user gives the OK, run `npm run ci` again from `shops/composition`. If CI fails, resolve the failure and show any revised diff for approval before the final CI run. Once CI passes, list the exact approved release files to stage. Include `package-lock.json` when it changed as part of the release and omit unchanged or unrelated files. Give the user a `git add --` command listing only those paths. The example below covers a release that changes all three files. Run the commands from `shops/composition` and replace `x.y.z` with the release version. The user stages and commits the files. Wait for their confirmation that the commit succeeded.

   ```sh
   git add -- package.json package-lock.json CHANGELOG.md
   git commit -m "release: x.y.z"
   ```

7. Only after the user confirms the commit, give them the following commands to run from the Gang of Forty repository root. The subtree split reads the committed state of `HEAD`. Replace `<version>` with the release version in both commands and wait for the user to confirm the push succeeded.

   ```sh
   git subtree split --prefix=shops/composition -b composition-release-<version>
   git push shop composition-release-<version>:main
   ```

8. After the user confirms the push, call Playwright MCP to set a 390 × 844 viewport, navigate to `https://composition-shop.vercel.app/`, and wait for products to appear. Use the MCP console and network tools to report Console errors and warnings and every non-2xx or failed request from that load, including static resources. Report if products failed to appear.
9. If verification finds real errors, diagnose and fix them. Show the fix diff, wait for the user's OK, rerun CI, and give the user the exact files and command for their fix commit. After they confirm the commit, give them the subtree split and push commands using a fresh split branch. After they confirm the push, repeat the Playwright MCP check at 390 × 844. Continue until products load and verification is clean.
