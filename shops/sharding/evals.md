# Sharding coding assistant evaluation

## Method

I gave the same five coding tasks to two independent Codex sessions. Both started from commit `5fa372da` with identical dependencies. The control checkout had no `AGENTS.md` in its working tree or Git history. I discarded a preliminary control run because the assistant recovered the removed file from Git history.

A task passed if its specific check passed and `npm run ci` was green. On the starting commit, CI passed and all five task checks failed.

## Tasks and results

| Task | Acceptance check | Without `AGENTS.md` | With `AGENTS.md` |
| --- | --- | --- | --- |
| Add the Persian guidance “آدرس صفحه را بررسی کنید یا به خانه برگردید.” to the 404 page | Confirm the paragraph is present and the existing heading and home link are preserved. | ✅ | ✅ |
| Add an optional timeout to `getJSON` | Verify the default 8,000 ms and an override, plus HTTP errors, request cancellation, and timer cleanup. | ✅ | ✅ |
| Add `stockStatus` and export the shared `StockStatus` type | Check missing, zero, negative, and positive stock. Confirm the existing helpers still work and the type can be imported from the shared entry point. | ✅ | ✅ |
| Ignore invalid quantities in `cartCount` | Check an empty cart, a normal cart, and a mix of valid quantities with zero, negative numbers, fractions, `NaN`, and infinity. | ✅ | ✅ |
| Trim the `q` URL search parameter | Confirm surrounding spaces are trimmed, internal spaces are preserved, blank queries are omitted, and valid categories and non-string query handling are preserved. | ✅ | ✅ |

## Conclusion

Both sessions passed **5 out of 5** checks, and CI was green in both. This small evaluation showed no difference in pass rate. In the 404 diff, the run with instructions grouped the heading and paragraph together and kept the home link as the second flex item. The control added the paragraph as a third flex item. The scoring criteria checked the markup and did not include layout.

No experimental changes were merged. Deletion of the temporary branches could not be verified after the original local environment disconnected.
