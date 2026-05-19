# Startline Coach Pitch Reel

Use this when the submission needs a short video or GIF proof layer. `WALKTHROUGH.md` is the longer tour; this file is the tight version a judge can watch without losing the thread.

For a record-ready browser surface, open `landing/reel.html`. It turns this script into six scenes that can be captured after the landing design is approved.

## One-Line Hook

Startline Coach gives whole people portable executive-function accessibility: start, switch, remember, regulate, capture, recover, and close without shame.

## 75-Second Shot Plan

| Time | Shot | Point |
| --- | --- | --- |
| 0:00-0:08 | Landing hero and mobile first-reply preview | This is whole-person EF accessibility, with one stuck prompt as the fastest visible test. |
| 0:08-0:18 | `START_HERE.md` plus Claude Project launch kit | A stranger can start before reading every file. |
| 0:18-0:31 | First-reply scorecard and `FIRST_RUN.md` | The first response is scoreable: name friction, give one move, ask for proof. |
| 0:31-0:44 | Runnable landing console with a stuck prompt | The protocol chooses state, friction, move, and check instead of giving an article. |
| 0:44-0:58 | Transcript pack, red-face evals, and ICM trace | The coach is tested under shame, overload, communication threat, and re-entry. |
| 0:58-1:15 | Final smoke gate and clean-stage preflight | The public payload verifies while publication stays blocked until the approved link exists. |

## Voiceover

```text
Startline Coach is a folder-based executive-function accessibility coach for whole people: start, switch, remember, regulate, capture, recover, and close. It is not an ADHD knowledge base and not a productivity extractor. Load the folder into a Claude Project, paste the project instructions, and try: I need a coach to get started on this.

The first reply has to name the friction without blame, give one visible move, hold the rest of the context, and ask for tiny proof. The landing console previews that loop. The transcript pack, red-face evals, first-run receipt, scorecard, product thesis, and ICM trace make the behavior inspectable.

The final smoke gate verifies the public bundle, clean-stage handoff, copy controls, transcripts, scorecards, and submission surfaces. Until the approved public GitHub link is inserted, publication stays blocked on purpose.
```

## Cut Rules

- Keep the reel under 75 seconds.
- Show the coach behavior before showing verifier output.
- Show one stuck prompt, not a menu of features.
- Show `FIRST_REPLY_SCORECARD.md` before the proof gate so the judge knows what pass and fail mean.
- Do not show private notes, local paths, browser history, unpublished repository settings, ignored browser evidence, automation state, planning notes, or generated output.

## Final Frame

Show the Skool-ready sentence and the final smoke command:

```text
Startline Coach is external executive function for the whole human.

node scripts/final-review-smoke.mjs --expect-blocked
```
