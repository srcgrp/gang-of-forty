# Week 7 assistant evaluation

Use the same base commit and model for all ten trials. Run each trial in a
fresh Codex session on an isolated checkout of `eval/week7-agent`. Recreate
the checkout from the base commit for every trial. In the first condition,
rename both `AGENTS.md` and `CLAUDE.md` before opening the session and keep
their contents out of the session. In the second condition, leave both files
in place. Verify the result outside the evaluated session. Discard trial changes
and keep the evaluation branch separate from the shipping branch.

| Task | Prompt | Acceptance checks in addition to `npm run ci` |
|---|---|---|
| 1. Sort direction | Make the PLP price sort show the highest price first. Keep the default order. | Open a carousel PLP and select price sort. Check that prices descend and that restoring the default option restores the original order. |
| 2. Search whitespace | Trim leading and trailing whitespace in product search. | Search for the same known product with and without surrounding spaces and check for the same results. A whitespace-only query shows no search results panel. |
| 3. Checkout validation copy | Include the exact mobile number format in the Checkout validation message. | Add a product, open Checkout, and submit data with an invalid phone number. Check that the focused phone field is described by a visible message containing an example 11-digit number beginning with 09. |
| 4. Unknown route | Add a link to Checkout on the Not Found page. | Open `/#/missing-route`. Check that Not Found renders, the original home link works, and the new keyboard-focusable link opens Checkout. |
| 5. Theme persistence | Change the initial theme to dark while preserving existing user preferences. | Check that a fresh browser opens in dark mode, switch to light and reload, then verify the stored light preference remains active. |

| کار | بدون AGENTS.md | با AGENTS.md |
|---|---|---|
| 1 | Blocked, no patch. Baseline CI passed. | Blocked, no patch. Baseline CI passed. |
| 2 | Blocked, no patch. Baseline CI passed. | Blocked, no patch. Baseline CI passed. |
| 3 | Blocked, no patch. Baseline CI passed. | Blocked, no patch. Baseline CI passed. |
| 4 | Blocked, no patch. Baseline CI passed. | Blocked, no patch. Baseline CI passed. |
| 5 | Blocked, no patch. Baseline CI passed. | Blocked, no patch. Baseline CI passed. |

Ten independent Codex CLI sessions used `gpt-6.2-sol` and separate copies of
`eval/week7-agent` at base `4d3dedbd6`. The five without-instructions
copies had both instruction files moved aside before the sessions started.
The nested Codex runtime did not produce a patch in any trial. The shell
reported an unavailable runtime provisioning service. The external runner
verified that there were no application changes and that `npm run ci`
passed in all ten copies. No changed behavior was available for feature
verification.

Both conditions left the application unchanged, so the trials do not measure
an effect from the instruction files. Repeat the comparison in an environment
where the independent sessions can inspect and edit their checkouts.
