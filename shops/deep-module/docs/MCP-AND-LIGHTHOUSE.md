# Playwright MCP & Lighthouse Mobile Validation Guide (`sabzkaleh`)

> **Status:** `MANUAL ACTION REQUIRED` after deploying to Vercel Production. Do not fabricate screenshots, console results, or Lighthouse scores.

---

## 1. Playwright MCP Configuration

Add the following server block to your MCP client configuration (e.g. Claude Code `.mcp.json` or Claude Desktop config):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

## 2. Live Production Validation Steps (`390x844`)

Once `shop.json` (`liveUrl`) is updated with your real Vercel production URL, run these exact 7 steps via Playwright MCP:

1. **Open production URL** (`https://<your-sabzkaleh-app>.vercel.app`).
2. **Resize browser** to `390x844` (mobile viewport).
3. **Wait until products are visible** on the page (confirm Persian product names, prices in تومان, and RTL layout).
4. **Check console messages** (expected: `0` errors, `0` warnings).
5. **Check network requests** (confirm `/api/products.json`, `/api/categories.json`, `/api/shop.json`, `/api/home.json`, `/api/offers.json`, `/api/stock.json` all return `200 OK` and `Vazirmatn-*.woff2` fonts load cleanly).
6. **Check failed requests** (expected: `0` failed requests).
7. **Take a full-page screenshot** and save it as:
   ```text
   docs/mobile.png
   ```

> **MANUAL ACTION REQUIRED:** After deployment, use Playwright MCP at `390x844` against the real production URL and save the real full-page screenshot as `docs/mobile.png`.

---

## 3. Lighthouse Mobile Audit Checklist

Run Google Chrome DevTools **Lighthouse** (or `npx lighthouse <liveUrl> --preset=perf --form-factor=mobile --view`) against the live Vercel production URL:

- [ ] **Device:** Mobile
- [ ] **Performance:** record real score (`__/100`)
- [ ] **Accessibility:** record real score (`__/100`) — **must be >= 90**
- [ ] **Best Practices:** record real score (`__/100`)
- [ ] **SEO:** record real score (`__/100`)
- [ ] Capture the Lighthouse summary screenshot and attach it directly to **Pull Request #7**.

### If Accessibility Is Below 90
1. Inspect the **first two** Accessibility audit recommendations in the Lighthouse report.
2. Fix only the specific accessibility issues in the source (for example, contrast ratio, missing `aria-label`, or heading order) without unnecessary UI rewrites.
3. Run `npm run ci`, push the fix, wait for Vercel redeploy, and re-run Lighthouse Mobile to verify Accessibility >= 90.
