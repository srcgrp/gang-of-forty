# Week 7 Eval

Five small tasks for Nardone, tested against the storefront at `724da9a`.

## Method

- Each task ran twice in fresh Codex CLI sessions, starting from the same source and using the same task text. The order alternated between tasks. The guide was available only in the `AGENTS.md` condition. This Codex project uses no `CLAUDE.md`.
- Direct edits in the trial sessions were blocked by the runner. For the comparison, both sessions received the same target file and returned replacement code. The harness applied the response verbatim in a separate copy of the storefront. All five task-specific checks also rejected the unchanged baseline.
- A run passes when the expected change works, only the target file changes, and `npm.cmd run ci` succeeds. The trial changes stayed in isolated copies.

## Results

| Task | Executable acceptance check | Without `AGENTS.md` | With `AGENTS.md` |
| --- | --- | --- | --- |
| Add `آدرس صفحه را دوباره بررسی کنید.` under the heading on the `#/x` fallback page. | Check that `NotFound.tsx` has the paragraph after its heading, keeps the home link, and remains the router fallback. | ✅ | ✅ |
| Export `formatCartQuantity` from `src/utils/format.ts`. | Call it with `12` and `0` and expect `۱۲ کالا` and `۰ کالا`. Check `formatCount(12)` and `formatPrice(12)` still return `۱۲` and `۱۲ تومان`. | ✅ | ✅ |
| Export `hasCartItem` from `src/cart/cart.ts`. | Call it on frozen cart lines. Require `true` for a matching positive quantity and `false` for missing, zero, or negative quantities. | ✅ | ✅ |
| Accept the `0098` prefix in the checkout phone validator. | Call `checkoutErrors` with local, `+98`, and `0098` numbers, including Persian and Arabic digits and separators. Reject short numbers and invalid prefixes. | ✅ | ✅ |
| Extract and reuse `parseCartLines` in `src/storage/cart-storage.ts`. | Call the parser with `null`, malformed JSON, an object, and mixed valid and invalid rows. Mock `localStorage` to check `loadCart()` and confirm that it calls the parser. | ✅ | ✅ |

Both conditions passed 5 of 5 tasks and produced identical source after normalizing line endings and trailing whitespace.
These small tasks supplied the target source directly. The result leaves open whether the guide helps when the assistant has to find its way around the repository.

## Repeat the checks

From the storefront folder in each trial copy, run the matching row below, then run `npm.cmd run ci`. Run each check on a copy where its task has been applied. The assertions use Node.js 24.

```powershell
@'
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

switch (process.argv[2]) {
  case 'not-found': {
    const page = readFileSync('src/components/pages/NotFound.tsx', 'utf8');
    const router = readFileSync('src/App.tsx', 'utf8');
    assert.match(page, /<\/h1>\s*<p(?:\s[^>]*)?>آدرس صفحه را دوباره بررسی کنید\.<\/p>/u);
    assert.match(page, /<Link\s[^>]*to=["']\/["'][^>]*>بازگشت به خانه<\/Link>/u);
    assert.match(router, /notFoundComponent:\s*NotFound/);
    break;
  }
  case 'format': {
    const { formatCartQuantity, formatCount, formatPrice } = await import('./src/utils/format.ts');
    assert.equal(formatCartQuantity(12), '۱۲ کالا');
    assert.equal(formatCartQuantity(0), '۰ کالا');
    assert.equal(formatCount(12), '۱۲');
    assert.equal(formatPrice(12), '۱۲ تومان');
    break;
  }
  case 'cart': {
    const { hasCartItem } = await import('./src/cart/cart.ts');
    const lines = Object.freeze([
      Object.freeze({ productId: 1, qty: 2 }),
      Object.freeze({ productId: 2, qty: 0 }),
      Object.freeze({ productId: 3, qty: -2 }),
    ]);
    assert.equal(hasCartItem(lines, 1), true);
    for (const id of [2, 3, 4]) assert.equal(hasCartItem(lines, id), false);
    assert.equal(hasCartItem([], 1), false);
    break;
  }
  case 'checkout': {
    const { checkoutErrors } = await import('./src/cart/checkout.ts');
    const error = (mobile) => checkoutErrors({ name: 'Test', mobile, address: 'Test' }).mobile;
    for (const number of ['09123456789', '+989123456789', '00989123456789', '۰۰۹۸ ۹۱۲-۳۴۵-۶۷۸۹', '٠٠٩٨٩١٢٣٤٥٦٧٨٩']) {
      assert.equal(error(number), '', number);
    }
    for (const number of ['0098912345678', '00988123456789', '9123456789']) assert.ok(error(number));
    break;
  }
  case 'storage': {
    const { parseCartLines, loadCart } = await import('./src/storage/cart-storage.ts');
    const line = { productId: 4, qty: 2 };
    const mixed = JSON.stringify([null, { productId: '4', qty: 2 }, { productId: 4, qty: '2' }, line]);
    for (const raw of [null, '{', '{}']) assert.deepEqual(parseCartLines(raw), []);
    assert.deepEqual(parseCartLines(mixed), [line]);
    for (const [raw, expected] of [[null, []], ['{', []], [mixed, [line]]]) {
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: (key) => {
        assert.equal(key, 'cart');
        return raw;
      } } });
      assert.deepEqual(loadCart(), expected);
    }
    const source = readFileSync('src/storage/cart-storage.ts', 'utf8');
    assert.match(source, /export function loadCart\(\)[\s\S]+?\bparseCartLines\(/);
    break;
  }
  default: throw new Error('Choose not-found, format, cart, checkout, or storage.');
}
'@ | node --input-type=module - not-found
```

Replace `not-found` on the last line with `format`, `cart`, `checkout`, or `storage` for the other tasks.
