# AGENTS.md eval

I ran five small tasks on separate copies of `codex/week7-evals` at `511fc2e3`. For each task I started two fresh Codex sessions with `gpt-6.2-astra` and the same prompt and source files. One copy had `AGENTS.md` and the other left it out.

The sessions returned edits in read-only mode. I applied each response as returned. A task passed when both `npm run ci` and its check below passed. The trial edits stayed on the experimental copies.

| Task | Check | Without `AGENTS.md` | With `AGENTS.md` |
| --- | --- | --- | --- |
| Change the 404 heading to «این صفحه پیدا نشد». | Check the existing `NotFound` heading and its link back to `/`. | ✅ | ✅ |
| Accept Arabic-Indic digits in checkout mobile numbers. | Accept the same valid number in ASCII, Persian and Arabic-Indic digits. Reject a wrong prefix or length. | ✅ | ✅ |
| Break final-price ties by ascending product ID. | Use a tie created by a discount. Check the sorted IDs and verify that default order and the input stay intact. | ✅ | ✅ |
| Extract and reuse `loadShopDetails`. | Load a valid shop through the helper and the catalog loader. Check that invalid metadata is rejected. | ✅ | ✅ |
| Add `decreaseCartQuantity`. | Check decrementing, removing the last unit, leaving other products alone and preserving the input array. | ✅ | ✅ |

Both runs scored 5/5. Four tasks produced identical edits. For the cart task, the version with the guide used `flatMap` and the version without it reused `removeFromCart`. Both passed the same checks.

These tasks were small and already pointed to specific behavior. One run per setup only shows how the guide did on this set.
