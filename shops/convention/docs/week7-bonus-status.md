# Week 7 bonus continuation — 2026-11-28 (Asia/Tehran)

Evidence was collected around 2026-11-27 20:41–20:49 UTC (the following local calendar day in Tehran). Only observed outcomes are marked complete.

## Access checks

- Initial sandbox Git/curl requests failed to connect. After approved escalation, `git ls-remote shop` succeeded and returned main/HEAD `074af72b3dcc826da44e7ef114619fff709442fb`.
- GitHub repository API returned HTTP 200. Authentication through the existing Git credential helper identified account `YBN2004` with repository push/admin permissions. Credentials were not printed or written to evidence files.
- `gh --version` / `gh auth status`: `gh : The term 'gh' is not recognized`.
- `docker --version` / `docker info`: `docker : The term 'docker' is not recognized`. The standard Docker Desktop executable location was also absent. Local Docker installation/engine operation is not verified.
- GHCR `HEAD /v2/` returned HTTP 405. A subsequent anonymous token request and GET of the actual `1.0.0` manifest returned HTTP 200. Digest: `sha256:ba34c313f0d82143ed71972efcda3a0b1ff08460a498e3be9f1675f8c7f1a35a`.
- No GitHub MCP tools were exposed to the session. A direct JSON-RPC `initialize` to the configured `https://api.githubcopilot.com/mcp/` endpoint using the Git helper credential failed: `Invoke-WebRequest : forbidden: access denied`. REST access does not establish MCP access.

## Bonus 1 — pending independent sessions

See [evals.md](../evals.md). No paired trial has been claimed as run. The existing dirty course checkout was preserved.

## Bonus 2 — anonymous pull and run passed

[Hosted verification run](https://github.com/YBN2004/convention-shop/actions/runs/46065684834), [job](https://github.com/YBN2004/convention-shop/actions/runs/46065684834/job/140730307560), [actual log](week7-anonymous-ghcr.log), [workflow copy](week7-anonymous-ghcr.yml).

On head `58e3b7f1e6e2b3fe8f6d1cbf9861740a35ae37cc`, Ubuntu's Docker used a newly created config directory containing only `{}`. No registry login or package credential was supplied. It pulled `ghcr.io/ybn2004/convention-shop:1.0.0`, reported the digest above, started the container, checked the root HTML contains `id="root"`, and compared `/checkout` with the root response to verify SPA fallback. The job succeeded. This verifies hosted Docker execution, not a local Docker install or live upstream API availability.

## Bonus 3 — red → green observed; MCP requirement pending

[PR #1](https://github.com/YBN2004/convention-shop/pull/1), branch `bonus/week7-ci-repair-20261128`.

| Stage | Actual result | Evidence |
| --- | --- | --- |
| Intentional string assigned to number | Check failed, TS2322, exit 1; SHA `47ddb600223faa92b82ca389eb59e884857df687` | [Red run](https://github.com/YBN2004/convention-shop/actions/runs/46065548391), [check log](week7-bonus3-failing-check.log) |
| Numeric repair | SHA `eb5bf5301678d50582329ee4ba53ff3a9e7a9d5d`; run cancelled by next push | [Cancelled run](https://github.com/YBN2004/convention-shop/actions/runs/46065627842) |
| Repair plus anonymous-image workflow | SHA `58e3b7f1e6e2b3fe8f6d1cbf9861740a35ae37cc`; check, docker and preview deploy succeeded; publish skipped | [Green run](https://github.com/YBN2004/convention-shop/actions/runs/46065684673) |

The preview URL was extracted from the successful deploy log: https://convention-shop-64bykusfu-ybntrade-1826.vercel.app. Browser testing of this preview is pending. Failure logs were inspected with the GitHub REST API, not MCP. Complete the MCP requirement by inspecting the recorded red job and identifying TS2322 through an authorized GitHub MCP connection. Keep this test PR unmerged.

## Bonus 4 - catalog recovery confirmed by owner

The [1.0.1 production run](https://github.com/YBN2004/convention-shop/actions/runs/46068336166) succeeded for `5daf4ef`, which introduced the incorrect catalog endpoint. Revert `2d16228` restored the healthy baseline tree. The recovery release `6bc9d9b` (1.0.2) passed standalone CI and matches the locally recorded personal origin/main. The owner subsequently confirmed that products appeared on the live storefront.

On 2026-11-27 the owner saw a storefront error at 21:12:37.1983661 UTC and products at 21:15:55.3500148 UTC. Observed recovery interval: 3 min 18.15 s. The Actions screenshot confirms successful runs on main: [#5 incident](https://github.com/YBN2004/convention-shop/actions/runs/46068336166), [#6 revert](https://github.com/YBN2004/convention-shop/actions/runs/46068952554), and [#7 recovery release](https://github.com/YBN2004/convention-shop/actions/runs/46069691943). They ran for 54 s, 70 s, and 49 s respectively.
