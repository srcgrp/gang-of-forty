# Agent Evaluation — Tracer Bullet

## Environment

- Tool: OpenAI Codex CLI v0.172.0
- Model: GPT-6.2-Sol
- Reasoning effort: Low
- Baseline commit: `64aaf483`
- Experimental branch: `experiment/tracer-bullet-w7-evals`

## Methodology

Five tasks were evaluated twice using identical prompts, model settings and starting code.
AGENTS.md was temporarily moved outside the repository for the first condition and restored for the second.
Each attempt used a fresh Codex session. Changes were inspected, tested and restored before the next task.
The experimental branch was not merged or deployed.

A pass requires the functional checks, successful CI, and compliance with the project's architecture and 70-line restriction.

## Tasks and success checks

| Task | Executable success check |
|---|---|
| 1. Display attempted pathname on NotFound | Open `/#/eval-not-found`, verify the pathname and Persian RTL layout, test the home link and run `npm run ci`. |
| 2. Persian percentage formatter | Execute `formatPercent(25)`, `formatPercent(0)` and `formatPercent(12.5)` using Node; inspect offer badges and run CI. |
| 3. Single product loader | Import `loadProductById` through the Vite browser console; verify a known ID returns its product and an unknown ID returns null; run CI. |
| 4. Clear-cart button | Add products, click the button, verify zero items and total, reload and confirm persistence; run CI. |
| 5. In-stock product filter | Open the dairy category, toggle the checkbox, verify counts and sorting, reload, and check file lengths using PowerShell; run CI. |

## Results

| Task | Without AGENTS.md | With AGENTS.md |
|---|---|---|
| NotFound pathname | ✅* | ✅* |
| Persian percentage formatter | ✅ | ✅ |
| Single product loader | ✅ | ✅ |
| Clear-cart button | ✅ | ✅ |
| In-stock product filter | ❌ | ✅* |
| Provisional total | 4/5 | 5/5 |

## Observations

- Task 1: Both implementations were identical; NotFound.tsx contained 15 lines.
- Task 2: Both implementations were identical; all three Persian formatting checks passed.
- Task 3: Both implementations were identical; product ID 101 was returned correctly and an unknown ID returned null.
- Task 4: Both implementations reused the Zustand clear action. Manual browser tests showed three products being cleared and the total reaching zero. Persistence was verified by agent tests.
- Task 5: Both implementations supported stock filtering. However, PlpPage.tsx contained 71 lines without AGENTS.md and 67 lines with it.
- Both Task 5 implementations kept the filtering expression inside the page component. Extracting it into the catalog layer would improve separation.
- All ten completed implementations passed lint, TypeScript checking and production build. No test script was configured.
- No experimental source code was committed or pushed.

## Limitations

- During Task 5 without AGENTS.md, Codex retrieved its committed contents using `git show HEAD:./AGENTS.md`. The comparison measures automatic instruction loading rather than complete instruction isolation.
- Some agent browser tests used catalog fixtures because of upstream API errors.
- Only one completed attempt per task per condition was evaluated.
- *Task 1 home navigation and console checks, and Task 5 enabled-condition sorting and reload checks, require confirmation for a fully verified score.

## Conclusion

AGENTS.md made no observable implementation difference in the first four tasks, but automatic loading coincided with compliance with the 70-line limit in Task 5.
The provisional pass rate increased from 80% to 100%; the small sample and instruction retrieval limitation prevent a general causal conclusion.