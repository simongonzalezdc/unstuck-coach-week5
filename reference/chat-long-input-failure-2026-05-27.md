# Chat Long-Input Failure — Root Cause and Fix

Date: 2026-05-27

## User-observed failure

A replay showed an engaged user spending time with the `/chat/` demo. When they entered the longest message, the tool failed. This is a high-priority demo failure because the product promise explicitly says messy context is valid input.

## Root cause

The deployed chat client posts the current message plus conversation history to `/api/coach`.

The live-demo server source in `/Users/simongonzalezdecruz/workspaces/skool_competitions/EF-COACH/live-demo` had a `MAX_BODY_BYTES` envelope of `16_000`. The server only trims prompt-side message/history content after reading and parsing the whole JSON body, so sufficiently long engaged input is rejected before the safety trim runs.

Reproduction against production on 2026-05-27:

- ~12.8KB message payload: HTTP 200.
- ~20.8KB message payload: HTTP 413 with `{"error":"request body too large"}`.

Because the client rendered `body.error`, the user saw a failure instead of a coached recovery.

## Local fix implemented in live-demo source

Files changed in `skool_competitions/EF-COACH/live-demo`:

- `server.mjs`
  - raised transport body envelope from `16_000` bytes to `80_000` bytes;
  - raised prompt-side message trim from `2_500` chars to `6_000` chars;
  - retained bounded context/history before model calls.
- `public/app.js`
  - sends only the last 4 history turns;
  - trims each history turn to 900 chars before request serialization;
  - maps 413 errors to a humane recovery message instead of raw failure text.
- `scripts/build-hostinger-compose.mjs`
  - mirrors the body-envelope/history-trim fix in the compact generated VPS compose path while staying under the Hostinger API content limit.
- `test/server.test.mjs`
  - adds regression: an engaged long message succeeds and is trimmed before model call.
- `test/compose.test.mjs`
  - updates generated-server oversized-body regression to the new hard envelope.

## Verification

From `/Users/simongonzalezdecruz/workspaces/skool_competitions/EF-COACH/live-demo`:

```sh
node --test test/*.test.mjs
```

Result: 41/41 tests passing.

## Deployment status

The fix is local source only until the live demo is redeployed. Do not claim production is fixed until `/api/coach` no longer returns 413 for the reproduced long engaged input size.

## Deployment update — 2026-05-27T21:01Z

Deployed to `https://unstuck.kyanitelabs.tech` from the EF-COACH live-demo source.

Verification after deploy:

- `GET /health` returned `200`.
- `GET /` returned `200` with CSP allowing the PostHog proxy origin.
- `GET /posthog.js` returned `200` and serves the low-volume `UnstuckAnalytics` tracker.
- `GET /chat/` returned `200`.
- Replayed the engaged long-message regression with an approximately 20KB `/api/coach` payload; it returned `200` instead of the previous `413 request body too large`.
- Backend container env now has `POSTHOG_ENABLED=true`, `POSTHOG_HOST=https://us.i.posthog.com`, and a `phc_` project API key.
- Backend logs for `view_landing`, `view_chat`, `chat_started`, and `llm_reply_ok` show `posthogEnabled:true`.
- Direct PostHog capture canary to `https://us.i.posthog.com/capture/` returned `200 {"status":"Ok"}`.

Rollback anchors on the VPS:

- `/docker/unstuck-coach-live/app.bak-20260527T205123Z`
- `/docker/unstuck-coach-live/landing-file-backups-20260527T205123Z`
- `/docker/unstuck-coach-live/docker-compose.yml.bak-20260527T210114Z`
- `/docker/unstuck-coach-live/app/live-demo/server.mjs.bak-20260527T210114Z`

## End-to-end operator verification — 2026-05-27T21:15Z

Fresh verification executed after the deploy and after checking the browser/operator paths.

Executed checks:

- Local regression suite in EF-COACH live-demo: `node --test live-demo/test/*.test.mjs` passed `42/42`.
- Canonical live HTTP route matrix returned expected statuses for `/health`, `/`, `/posthog.js`, `/app.js`, `/chat/`, `/chat/posthog.js`, `/chat/app.js`, `/api/config`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/coach/START_HERE.md`; scanner/removed routes `/reel` and `/source` returned `404`.
- Browser operator path with CloakBrowser:
  - Loaded landing page, verified `window.UnstuckAnalytics` and free-tier budget object.
  - Clicked landing example tab and review-panel navigation.
  - Verified landing console had zero messages.
  - Loaded `/chat/`, selected energy `3`, typed a real stuck-point message, submitted it, and received a live model reply with the support panel updated.
  - Used `Insert tiny ask` and `Start` chip paths.
  - Used chat `Back to landing` path and verified it returned to the landing page.
  - Re-loaded `/chat/` after cleanup and verified console had zero messages.
- API operator paths:
  - Long approximately 20KB engaged `/api/coach` payload returned `200`.
  - Empty message returned `400`.
  - Non-JSON content type returned `415`.
  - Approximately 90KB oversized body returned `413`.
  - Cross-site browser origin returned `403`.
- Analytics/free-tier guardrails:
  - Found and removed a stale live `/chat/posthog.js` load that had `session_replay:true` from an older deployment artifact.
  - Deployed canonical chat HTML with no PostHog full-array loader in the chat operator path.
  - Replaced `/chat/posthog.js` with the safe low-volume `UnstuckAnalytics` tracker so the stale URL no longer exposes `session_replay:true` if directly requested.
  - Final live route matrix confirmed no checked route contains `session_replay:true` or `array.js` loader.
  - Direct PostHog capture canary returned `200 {"status":"Ok"}`.
  - VPS logs show `posthogEnabled:true` for view/chat/model success and expected rejection events.
- Fallback Hostinger route:
  - `https://srv1542844.hstgr.cloud/unstuck/chat/` returns `200`, has the chat UI, has no `posthog.js` load, has no `session_replay:true`, and the topbar back link is now relative (`../`) so it resolves inside `/unstuck/` instead of escaping to host root.

Current known gap:

- I did not query the PostHog UI/MCP for the newly ingested events because the PostHog MCP was listed in Codex config but not exposed as a callable tool in this run. Delivery was verified by capture endpoint acceptance plus backend configuration/log evidence.
