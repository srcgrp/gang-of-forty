---
name: release

description: Prepare and guide a versioned release for the Liskov Shop. Use when preparing or publishing a release.
---

# Liskov Shop Release

Follow these steps in order when preparing a release.

## 1. Ask for release details

- Ask the user for the target version number.

- Ask the user for a short release summary.

- Do not assume or choose a version without user input.

## 2. Run CI

- Run `npm run ci`.

- Stop if any check fails.

- Report the failure and do not continue until it is resolved.

## 3. Bump the version

- Update the version in `package.json` and `package-lock.json`.

- Use `npm version <version> --no-git-tag-version`.

- Verify that both files contain the requested version.

## 4. Update CHANGELOG

- Review the relevant commit history using `git log`.

- Add a release entry to `CHANGELOG.md`.

- Include the supplied version, date, summary, and relevant changes.

- Do not invent changes that are not supported by the commit history.

## 5. Review changes

- Run `npm run ci` again.

- Show the complete release diff to the user.

- Wait for explicit user approval before committing.

- Do not commit before approval.

## 6. Commit the release

After approval, create the release commit using:

`git commit -m "release: x.y.z"`

Replace `x.y.z` with the requested version.

## 7. Publish instructions

- Provide the commands needed to publish the shop subtree to the standalone repository.

- Do not execute subtree split or push commands.

- Wait for the user to publish the changes and explicitly confirm that the push succeeded.

## 8. Verify the deployed release

After the user confirms the push:

- Open the live site using Playwright.

- Set the viewport to 390x844 with deviceScaleFactor 1.

- Check browser console errors.

- Check failed network requests and HTTP responses with status 400 or higher.

- Report the findings to the user.
