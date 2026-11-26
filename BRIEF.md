# BRIEF — Tabs v2: "137"

## Competition
- Slug: `u-danu-how-many-tabs-do-you-have-open-d86e783d`
- Title: "How Many Tabs Do You Have Open?"
- Format: program/v1, entry is a bare number written to `/output/entry.txt`.
- Deadline: 2026-11-27 04:55 WIB (2026-11-26T21:55:00Z). Prizes: top 10 share $5.

## Kit scoring rule (quoted from competition.yaml / RULES.txt)
- Gate: "`/output/entry.txt` is UTF-8 text of 1 to 5 characters, not only white space" — only a valid entry goes before the judge.
- Judge (AI model, pairwise, no ties): "Pick the more surprising tab count. Weigh them on these, most important first: 1. The entry is a single number that reads as a real count of open browser tabs... 2. It is exactly one number in digits, with no words, no punctuation and no second number. 3. The count is surprising, far higher, far lower or stranger than what the field would guess. 4. The count is believable as an honest answer, a number a real person could have open right now, not an absurd figure picked to shock. 5. The number hints at a life behind it, a habit or a situation, without a word of explanation. Size for its own sake does not count."

## Decision: PROCEED with v2 entry "137"
The kit does NOT score on size alone ("Size for its own sake does not count") — the judge weighs surprise, believability, and life-hint. That leaves a real, non-arbitrary improvement axis over v1, so this is not a random-number pick.

## V2 entry: `137` (3 digits, no trailing newline)
- v1 was "1" — the joke of an obviously dishonest low tab count. Under the judge's own criteria it is weak: criterion 4 (believable as an honest answer) — "1" reads as a joke/lowball from someone entering a tab-hoarder contest, not a counted honest answer; criterion 5 (hints at a life behind it) — "1" hints at almost no habit or situation, just a fresh browser.
- "137" beats "1" on criteria 3–5 while tying it on 1–2 (both are valid single digit-only numbers):
  - Criterion 3 (surprising): 137 is far higher than the field would guess — a triple-digit hoard, not a tidy handful.
  - Criterion 4 (believable): hundreds of tabs is real, documented hoarder behaviour, and the odd, non-round number reads as actually counted rather than estimated or picked to shock. Round numbers (100, 500) and joke numbers (42, 69, 1337, 9999) would fail here; 137 does not.
  - Criterion 5 (life behind it): a specific counted pile hints at a real habit — a research spiral, a never-close-anything workflow — with no words of explanation.
- Why not "0": it would be stranger/lower than "1", but it risks failing criteria 1 and 4 — zero open tabs while submitting from a browser is not a real count a person could have open right now.
- Why not a bigger number (e.g. 9999): the kit says size for its own sake does not count, and a four/five-digit count fails criterion 4 as an absurd figure picked to shock. 137 sits inside the believable-hoarder band.
- Caveat: the 3 fixed house texts are revealed only with the final kit, so a byte-collision with a fixed text cannot be checked from this kit. "137" is not an obvious anchor candidate (anchors are weak-to-strong calibration texts, typically round/common counts).

## Program spec (main.ts, plain JavaScript, no deps, no network)
- Reads `entry.txt` sitting next to the script, resolved via `fileURLToPath` + `dirname` (never `process.cwd()`).
- Validates via a `validateEntry()` function: 1–5 chars, digits only, not only whitespace; throws otherwise.
- Writes the entry byte-for-byte to `$MAKEFUN_OUTPUT_DIR/entry.txt` (`mkdirSync` recursive only, never `rmSync` the output dir; throws if `MAKEFUN_OUTPUT_DIR` is unset). Deterministic.
- Authored fresh in-session from this prose spec; the old v1 `main.ts` was never read (trashed, recoverable).

## Status / pending (coordinator)
- Files written in-session: `entry.txt` ("137"), `main.ts` (fresh + `validateEntry()` revision), `BRIEF.md`. `README.md` + `LICENSE` untouched.
- NOT YET DONE — a system execution-risk notice fired on the entry directory during the `git log/status` check, so no further exec/git/test commands were run in that directory. Pending for the coordinator (or after user go-ahead): (1) /tmp-cwd test twice byte-identical: `cd /tmp && MAKEFUN_OUTPUT_DIR=/tmp/out-u-danu-how-many-tabs-do-you-have-open-d86e783d node <entry-dir>/main.ts`; (2) `git add entry.txt main.ts BRIEF.md`, commit as Ktktkte / 272925525+Ktktkte@users.noreply.github.com ("Tabs v2: 137 counted hoard"); (3) push to origin main and verify HEAD SHA via `git log`. Do NOT bundle/submit from this session.
