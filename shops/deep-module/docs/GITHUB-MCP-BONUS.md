# Bonus #3 — GitHub MCP CI Failure & Fix Exercise

> **Status:** `MANUAL ACTION REQUIRED`
> **Important:** Zero broken TypeScript code is included in `main`. Follow the steps below on a temporary branch only.

---

## Step-by-Step Manual Procedure

1. **Create a temporary branch manually** (from your shop repo or Gang of Forty branch):
   ```bash
   git checkout -b test/github-mcp-ci-fail
   ```

2. **Introduce a controlled TypeScript error** (for example, temporarily add at the top of `src/main.tsx` or a test file):
   ```ts
   const brokenTypeCheck: number = "a";
   ```

3. **Commit and push manually**:
   ```bash
   git add src/main.tsx
   git commit -m "test: intentional TypeScript error for GitHub MCP exercise"
   git push -u origin test/github-mcp-ci-fail
   ```

4. **Open a Pull Request manually** on GitHub targeting `main` (do not merge).

5. **Allow GitHub Actions `check` job to fail**:
   Wait ~30–60 seconds for `npm run ci` (`tsc --noEmit`) to fail on the PR.

6. **Configure GitHub MCP with a scoped, read-only/limited token** (never commit or paste tokens into repo files):
   ```json
   {
     "mcpServers": {
       "github": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-github"],
         "env": {
           "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_LIMITED_PAT>"
         }
       }
     }
   }
   ```

7. **Read the workflow failure via GitHub MCP**:
   Ask your AI client using GitHub MCP to inspect the failed workflow run / check logs on `test/github-mcp-ci-fail`.

8. **Explain the failure**:
   Record the exact TypeScript compiler error (`TS2322: Type 'string' is not assignable to type 'number'`) and file/line returned from the Actions log.

9. **Fix the issue locally**:
   Remove the intentional broken line from `src/main.tsx`.

10. **Run CI locally**:
    ```bash
    npm run ci
    ```

11. **Push the fix and confirm green CI**:
    ```bash
    git add src/main.tsx
    git commit -m "fix: remove intentional TypeScript error"
    git push
    ```
    Confirm `check` and `docker` jobs turn green on GitHub Actions.

12. **Close (or clean up) the temporary PR/branch manually** so `main` stays clean with zero broken history.
