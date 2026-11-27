# Convention assistant evaluation

Use the same starting commit, assistant model, prompt and check for both trials. Start each trial on a fresh unmerged experiment branch. Open a fresh assistant session in the shop. For the first condition temporarily rename AGENTS.md and CLAUDE.md. Restore both for the second condition. Keep each trial's diff and check output on its experiment branch. A pass requires both the named check and `npm run ci`.

| Task prompt | Executable acceptance check | Without AGENTS.md | With AGENTS.md |
| --- | --- | --- | --- |
| Add a second way home on the unknown-page screen. | Open `/#/unknown`, activate the new link and verify that the home product cards load. | Pending | Pending |
| Include the endpoint filename in API HTTP errors. | Return 503 for products.json in browser request interception, reload, then verify the visible error contains products.json and 503. Restore the request and use Retry. | Pending | Pending |
| Add a test for an unknown cart ID in removeFromCart. | Run `node --test --test-name-pattern="unknown cart ID" tests/domain.test.mjs` and verify one matching test passed and asserts the input contents. | Pending | Pending |
| Add an accessible label to the price on product cards. | Inspect a product card in the browser accessibility tree, confirm the price is announced with its Persian amount and currency. | Pending | Pending |
| Include the validation command in the Docker run instructions. | Run `node -e "if (!require('fs').readFileSync('README.md','utf8').split('## Docker')[1]?.includes('npm run ci')) process.exit(1)"`. | Pending | Pending |

Results can be compared after the author supplies the project instructions and both sets of trials have run.

## Continuation status — 2026-11-28 (Asia/Tehran)

The project instructions already exist in AGENTS.md and have been read. The previous sentence's instruction-supply prerequisite is therefore satisfied; the paired trials themselves remain pending. No scores have been inferred from the existing implementation or from this ongoing session.

Ten fresh assistant sessions (five identical tasks, each with and without project instructions) have not been started. This environment requires an explicit request before launching additional agents/tasks. Authorization for independent evaluation sessions was requested during the continuation; it has not yet been received. Do not count this ongoing session as a fresh trial: it has already seen AGENTS.md.

Before starting, freeze and record one baseline commit containing the intended shop state. Personal-repository main `074af72b3dcc826da44e7ef114619fff709442fb` differs from the uncommitted course checkout: standalone CI has 4 tests, while the current course shop has 5. Mixing these baselines would invalidate the comparison. Record the actual model, exact prompt, baseline SHA, condition, trial branch, diff, acceptance evidence and complete CI result for each trial. Withhold instructions only inside isolated trial checkouts; preserve the author's working files.

Observed baseline verification, not an evaluation score: `npm.cmd run ci` passed in the current course shop (lint, types, 5 tests, build). It also passed in the clean personal-repository clone before release-draft edits (lint, types, 4 tests, build). `npm` alone is blocked by PowerShell execution policy, so the `.cmd` launcher was used.

Other bonus evidence and remaining blockers: [week7-bonus-status.md](docs/week7-bonus-status.md).
