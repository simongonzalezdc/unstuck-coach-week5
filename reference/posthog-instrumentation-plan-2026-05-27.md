# PostHog Instrumentation Plan — Unstuck Coach

Date: 2026-05-27
Scope: `/Users/simongonzalezdecruz/workspaces/unstuck-coach`

## Free-tier guardrails

Current PostHog Cloud free tier from the official pricing page on 2026-05-27:

- Product/Web analytics: 1M events/month.
- Session replay: 5K recordings/month.
- Feature flags: 1M requests/month.
- Error tracking: 100K exceptions/month.
- Free plan has one project and one-year retention.

Implementation guardrails in `landing/posthog.js`:

- Anonymous event stream only; no user text or PII is captured.
- No PostHog autocapture dependency.
- No session replay start in this repo instrumentation.
- Per-browser-session cap: 24 custom events.
- Per-event-name cap: 5 repeats per browser session.
- Bot/headless user agents are dropped.
- Events are direct, low-cardinality funnel events instead of high-volume click firehoses.

At the hard cap of 24 events/session, the 1M-event free tier supports roughly 41,666 sessions/month before analytics overage. Real usage should be lower because most sessions emit page view plus a small number of action events.

## Event taxonomy

| Event | Why it exists | Key properties |
|---|---|---|
| `page viewed` | Acquisition / entry surface | `surface`, `$pathname`, UTM fields, referrer |
| `demo cta clicked` | Landing -> live demo funnel | `label`, `surface`, `destination` |
| `setup cta clicked` | Setup intent | `label`, `surface`, `destination` |
| `quality cta clicked` | Education intent | `label`, `surface`, `destination` |
| `source link clicked` | GitHub/source intent | `label`, `surface`, `destination` |
| `nav link clicked` | Landing navigation | `label`, `destination` |
| `nav toggled` | Mobile nav usability | `label` |
| `landing panel opened` | Explicit tab/panel click | `panel` |
| `landing panel viewed` | Panel actually shown, including hash/load | `panel`, `source` |
| `example selected` | Demo comparison engagement | `example`, `example_index`, `source` |
| `coach preview submitted` | On-page coach preview activation if console exists | `input_length_bucket`, `state`, `friction`, `move`, `source` |
| `sample chip selected` | On-page preview sample usage if console exists | `input_length_bucket`, `state`, `friction`, `move` |
| `setup copied` | Setup handoff intent if copy controls exist | `copy_target`, `copied_length_bucket` |

## PostHog dashboard created

Created in PostHog project `439201`:

- Dashboard `1637203` — `Unstuck Coach Funnel`
- Insight `8893673` — `Unstuck Coach: pageviews by day`
- Insight `8893674` — `Unstuck Coach: page paths`
- Insight `8893675` — `Unstuck Coach: dead clicks by path/browser/text`
- Insight `8893676` — `Unstuck Coach: homepage to /chat`

## Recommended dashboard follow-ups

Add or update this dashboard with:

1. Sessions by day for host `unstuck.kyanitelabs.tech`.
2. `page viewed` by `$pathname`.
3. Funnel: `page viewed` -> `demo cta clicked` -> `/chat/` page viewed -> chat activation event.
4. `demo cta clicked` by `surface` and `label`.
5. `landing panel viewed` by `panel`.
6. `example selected` by `example`.
7. Dead-click count by `$pathname`, `$browser`, `$el_text` for legacy/current autocapture comparison.
8. Web Vitals p75 LCP, INP, CLS by path.

## Remaining instrumentation gap

The repo currently contains the landing surface. The deployed `/chat/` surface exists at `https://unstuck.kyanitelabs.tech/chat/`, but its source is not present in this checkout. Apply the same low-volume event strategy there:

- `chat opened`
- `chat prompt submitted`
- `coach response received`
- `next move copied`
- `make easier clicked`
- `parked item created`
- `voice started`
- `voice transcript received`
- `runtime status changed`
- `chat error shown`

Do not capture raw chat text. Use length buckets, route/mode, latency, provider status, and error codes only.

## How to interpret next data pull

Use these first thresholds as directional only until traffic is materially higher:

- If `demo cta clicked` is low relative to `page viewed`: landing copy/CTA problem.
- If `/chat/` opens but `chat prompt submitted` is low: demo affordance/onboarding problem.
- If prompts submit but `coach response received` is low: runtime reliability/latency problem.
- If response arrives but no `next move copied` / `make easier clicked`: coach output or UX value problem.
- If dead clicks remain concentrated on `/chat/`: clickable affordance/state feedback problem.
