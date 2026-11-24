# Week 7 AI Evals — Idempotency Shop

## Goal and method

Evaluate whether the shop-specific `AGENTS.md` changes the correctness, scope, or readability of Codex solutions to five tasks in `shops/idempotency`.

The experiment branch was `evals-experiment` and the application baseline was `a236036d`. For Tasks 3–5, each pair used the same prompt and baseline in two fresh Codex CLI sessions with the same model and sandbox settings. The shop-specific instructions were temporarily renamed for condition A and restored for condition B. The final Task 4 and 5 pairs used the same additional instruction in both conditions to avoid reading instruction backups or Git history and to scope diffs to application source. I captured the implementation diff, working tree status, and CI output before restoring the source after each run. Independent behavior checks replayed the captured patches on temporary copies of the baseline. Tasks 1–2 use the earlier run records and were not repeated.

## Results

A pass means the implementation met the task's acceptance criteria in the available checks. CI ran lint, TypeScript checks, and a production build. The package has no test script.

| Task | Without `AGENTS.md` | With `AGENTS.md` | CI (without / with) | Important implementation differences |
| --- | --- | --- | --- | --- |
| 1. NotFound page | Pass | Pass | Pass / Pass | Both added the `404` heading and kept the homepage link. A kept the existing Persian copy. B reworded it. |
| 2. Product search normalization | Pass | Pass | Pass / Pass | Both shared normalization across two search paths. A used a per-key Fuse getter. B used the index-level getter. |
| 3. Escape in search suggestions | Pass | Pass | Pass / Pass | Both used an input ref and restored focus before closing. B limited the handler to a visible dropdown. |
| 4. Missing cart item actions | Pass | Pass | Pass / Pass | Both skipped the Zustand update when the array reference was unchanged. A added an ID scan in the action helper and changed two files. B changed only the store. |
| 5. Catalog API timeout | Pass (native cleanup unmeasured) | Pass | Pass / Pass | A used `AbortSignal.timeout`. B used an `AbortController` and cleared its timer in `finally` after awaiting the body. |

## Behavioral evidence and code quality

- **NotFound page.** The earlier diffs show a visible `404` heading, Persian explanatory text, and the homepage link to `/` in both runs. Both changes were confined to `NotFound.tsx`.
- **Product search.** The earlier function checks covered Arabic, Persian, and mixed spellings, fuzzy matching, original display names, category filtering, four suggestions, and baseline blank-query behavior. Both patches were confined to the two search files.
- **Escape.** Chromium checks passed on both patches for input and suggestion focus, query preservation, focus return without reopening, reopening after typing, and scroll and highlight on selection. Both changed only `SearchBox.tsx`. Closing after focus restoration lets the close take precedence over the input’s focus handler.
- **Cart.** Store assertions passed for all three actions in empty and populated carts. Each missing-ID action returned `false`, kept the original array, and caused zero notifications and writes. Insert, increment, decrement, removal, and stock caps also passed. The reference check also skips the store update when an existing item is already at its stock cap.
- **Catalog timeout.** Chromium and a local fixture server verified that both patches aborted stalled headers and stalled JSON bodies after about eight seconds. The existing error UI appeared for timeouts and HTTP 503, and each retry issued six fresh requests and recovered. The A replay observed a fresh native signal per request and zero application timers. Chromium's internal cleanup was outside the check. The B replay verified that all application timers fired or were cleared, with none pending after completion.

## Overall result

All five tasks had passing implementations under both recorded conditions. In the fresh, controlled pairs for Tasks 3–5, adding `AGENTS.md` did not change the pass rate. The solutions differed in scope and timer handling. Those differences describe these patches only.

## Limitations

- The historical Task 1 attempts shared a conversation. The historical Task 2A session read the backup instructions. Their implementation results are retained, and both pairs are excluded from the controlled comparison.
- The first Task 4A and 5A sessions obtained the hidden instructions through Git and the backup respectively. Both pairs were repeated from baseline with tighter instructions, and the table uses the repeated pairs.
- The controlled comparison used one valid pair per task and one Codex model. Browser checks used Chromium and local catalog fixtures. The evaluation did not measure speed or performance on larger changes.

## Exact task prompts

### 1. NotFound page

```text
I am working on the idempotency shop in the Gang of Forty repository.



Please improve the NotFound page.



Requirements:

1. Display a clear "404" heading.
2. Add a short Persian message explaining that the requested page was not found.
3. Keep the existing link that takes the user back to the homepage.
4. Only modify `shops/idempotency/src/components/pages/NotFound.tsx`.
5. Keep the implementation simple.

After making the change:

- Run `npm run ci` from `shops/idempotency`.
- Show me the Git diff and explain what you changed.
- Report whether the checks passed.

Do not commit, push, or deploy anything.
```

### 2. Persian and Arabic product search

```text
In `shops/idempotency`, make product search treat Arabic `ي` and Persian `ی` as equivalent, and Arabic `ك` and Persian `ک` as equivalent.

Apply this to product names and queries in both the suggestion dropdown and the home page’s filtered product sections.

Keep the original product names on screen and preserve fuzzy matching, category filtering, the four-suggestion limit, and existing behavior for blank queries.

Run `npm run ci` from `shops/idempotency`, verify the requested behavior separately where possible, show the complete Git diff for your changes, and report the results.

Do not modify AGENTS.md or its backup.\
Do not commit, push, merge, deploy, switch branches, or discard changes.

Stop after reporting the results.
```

### 3. Escape in search suggestions

```text
In `shops/idempotency`, make Escape close the product search dropdown when focus is on the search input or a suggestion button. Preserve the typed query. If focus was on a suggestion, return it to the search input. Typing again should reopen suggestions, and clicking a result should still scroll to and highlight its product. Keep the change scoped to `SearchBox.tsx`. Run `npm run ci` from `shops/idempotency`, verify the requested behavior where possible, show the complete Git diff, and report the result.
```

### 4. Missing cart item actions

```text
In `shops/idempotency`, make `useCartStore.change` treat `increase`, `decrease`, and `remove` for a product ID that is absent from the cart as no-ops. Each call should return `false`, keep the same `lines` array reference, and avoid notifying subscribers or writing to cart storage. Preserve `add` as the way to insert a product, and preserve quantity changes, removal, and stock limits for existing items. Run `npm run ci` from `shops/idempotency`, verify the requested behavior separately where possible, show the complete Git diff, and report the result.
```

### 5. Catalog API timeout

```text
In `shops/idempotency`, give each catalog JSON request an 8-second timeout. The timeout should abort the request if either the response headers or the JSON body stalls. When a request times out, the shop should show its existing load-error and retry UI. Retrying should start fresh requests. Keep successful requests and existing HTTP error handling working. Run `npm run ci` from `shops/idempotency`, verify the requested behavior separately where possible, show the complete Git diff, and report the result.
```
