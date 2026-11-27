# Convention · Week 7 release draft

## Live URL

Production: https://convention-shop.vercel.app/ (opened in a private browser window by the owner). [Personal-repository test PR #1](https://github.com/YBN2004/convention-shop/pull/1), [successful PR preview](https://convention-shop-64bykusfu-ybntrade-1826.vercel.app). The preview URL was extracted from the successful deploy job log; browser verification of this preview is pending.

## Workflow run

The [first main-branch Actions run](https://github.com/YBN2004/convention-shop/actions/runs/46060518080) succeeded for commit `074af72`. The run passed all four jobs (`check`, `docker`, `deploy`, and `publish`). Required-check protection still needs verification.

## AI usage

Codex (GPT-6) prepared the Docker build, nginx proxy, Vercel workflow, release instructions and the maintenance changes. Codex also drafted the shop instructions for the author's review and rewrite. Local browser checks exercised category filtering and demo checkout. Inspection also caught a missed Persian-localization issue in the countdown. The week-six tests use Node’s built-in runner, so the CI command runs that runner directly without the Vitest-only flag from the PDF.

## MCP check

The owner checked the production site manually in Chrome DevTools using the 390 × 844 mobile viewport. Playwright MCP verification is pending.

| Production check at 390 × 844 | Result |
| --- | --- |
| Console warnings and errors | None observed in Chrome DevTools |
| Failed requests and non-2xx responses | None observed in Chrome DevTools |
| Full-page mobile capture | [docs/mobile.png](docs/mobile.png) |
| Mobile Lighthouse scores | Performance 78, Accessibility 96, Best Practices 92, SEO 90 |

The owner ran Lighthouse against the public production domain. Lighthouse flagged Chrome extensions as a possible influence on the Performance score. Attach the Lighthouse screenshot to the PR.

## Definition of Done

- [x] Local lint, typecheck, domain tests and Vite build.
- [x] Same-origin API path, two-stage Dockerfile, nginx fallback and Docker ignore rules.
- [x] Standalone workflow for checks, container smoke test, PR preview, production and GHCR publishing.
- [x] Release procedure and 1.0.0 changelog prepared.
- [ ] Author's AGENTS.md and fresh-session check.
- [ ] Actual release approval, step commits and publication.
- [x] Green Actions on main and production URL recorded in shop.json.
- [ ] Branch protection and PR preview URL.
- [ ] Production MCP evidence, docs/mobile.png, Lighthouse screenshot, badge and live link.
- [ ] Gang of Forty PR and green repository checks.
- [ ] Bonus 1: five paired assistant trials with observed outcomes in evals.md.
- [x] Bonus 2 publication: the `publish` job succeeded on [the first run on main](https://github.com/YBN2004/convention-shop/actions/runs/46060518080).
- [x] Bonus 2 verification: anonymous pull and run of `ghcr.io/ybn2004/convention-shop:1.0.0` passed on a hosted Docker runner: [run 46065684834](https://github.com/YBN2004/convention-shop/actions/runs/46065684834). A fresh empty Docker config was used without login; the root page and `/checkout` SPA fallback passed. [Actual job log](docs/week7-anonymous-ghcr.log), [workflow copy](docs/week7-anonymous-ghcr.yml).
- [ ] Bonus 3: intentional failing PR, GitHub MCP log inspection and green repair.
  - [Personal-repository PR #1](https://github.com/YBN2004/convention-shop/pull/1): intentional error commit `47ddb600223faa92b82ca389eb59e884857df687` produced `TS2322` and exit code 1 in [red run 46065548391](https://github.com/YBN2004/convention-shop/actions/runs/46065548391). [Actual check log](docs/week7-bonus3-failing-check.log).
  - Repair commit `eb5bf5301678d50582329ee4ba53ff3a9e7a9d5d` was superseded by `58e3b7f1e6e2b3fe8f6d1cbf9861740a35ae37cc`, which added the anonymous image check. The intermediate run was cancelled, not green. At the final head, `check`, `docker` and preview `deploy` succeeded in [green run 46065684673](https://github.com/YBN2004/convention-shop/actions/runs/46065684673); `publish` was skipped.
  - Log inspection used the GitHub REST API. GitHub MCP was not exposed as a connected tool; a direct initialize request to the configured GitHub MCP endpoint returned `forbidden: access denied`. The MCP-specific requirement remains pending.
- [x] Bonus 4: 1.0.1 incident, revert, 1.0.2 recovery, three workflow URLs and elapsed recovery time.
  - [Incident run](https://github.com/YBN2004/convention-shop/actions/runs/46068336166) for `5daf4ef`. Revert `2d16228` restored the baseline. Release `6bc9d9b` (1.0.2) matches the locally recorded personal origin/main. The Actions list shows green runs [#5 incident](https://github.com/YBN2004/convention-shop/actions/runs/46068336166), [#6 revert](https://github.com/YBN2004/convention-shop/actions/runs/46068952554), and [#7 recovery release](https://github.com/YBN2004/convention-shop/actions/runs/46069691943) on main. The owner saw a storefront error on the first check and products on the second, 3 min 18.15 s later. [Recovery evidence](docs/week7-bonus-status.md#bonus-4---catalog-recovery-confirmed-by-owner).

## Release decisions

The author records their rationale for writing AGENTS.md after supplying the file. The release procedure reserves the production push for the owner because it changes the storefront that customers see.
