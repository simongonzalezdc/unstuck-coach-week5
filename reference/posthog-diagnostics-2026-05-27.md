# PostHog Diagnostics — Unstuck Coach

Pulled read-only via PostHog MCP for `/Users/simongonzalezdecruz/workspaces/unstuck-coach`.

## Access

- Status: OK. PostHog MCP can read the target org, project, schema, dashboards, insights, and events.
- Org: `PuenteWorks` (`019e5df1-bfbc-0000-6504-153626ea5e39`)
- Project: `PuenteWorks + KyaniteLabs` (`439201`)
- Site: `unstuck.kyanitelabs.tech`
- Public project key observed in deployed JS: `phc_xCWVuCx8TVyi3YUzfVNX8BwznXbSvN9jesgEMkNs7Bde`
- Proxy observed in deployed JS: `https://puenteworks.com/ph`
- Pull timestamp: `2026-05-27T19:49:06Z` UTC / `2026-05-27T12:49:06-07:00` PDT

## 7-day event counts for `unstuck.kyanitelabs.tech`

| event | count |
|---|---:|
| `$scroll_depth` | 104 |
| `$autocapture` | 100 |
| `$web_vitals` | 36 |
| `$pageview` | 36 |
| `$dead_click` | 21 |
| `$pageleave` | 9 |

## 7-day path counts

| path | count |
|---|---:|
| `/chat/` | 265 |
| `/` | 41 |

## 30-day event counts for `unstuck.kyanitelabs.tech`

| event | count |
|---|---:|
| `$scroll_depth` | 104 |
| `$autocapture` | 100 |
| `$web_vitals` | 36 |
| `$pageview` | 36 |
| `$dead_click` | 21 |
| `$pageleave` | 9 |

## 30-day path counts

| path | count |
|---|---:|
| `/chat/` | 265 |
| `/` | 41 |

## Latest 20 events

| timestamp | event | path | url | browser | referrer |
|---|---|---|---|---|---|
| 2026-05-27T12:40:46.010000-07:00 | `$web_vitals` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Opera | `$direct` |
| 2026-05-27T12:40:18.246000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Opera | `$direct` |
| 2026-05-27T12:40:18.218000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Opera | `$direct` |
| 2026-05-27T08:11:51.438000-07:00 | `$scroll_depth` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` |  |  |
| 2026-05-27T08:11:43.503000-07:00 | `$scroll_depth` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` |  |  |
| 2026-05-27T08:11:31.222000-07:00 | `$scroll_depth` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` |  |  |
| 2026-05-27T08:11:28.016000-07:00 | `$scroll_depth` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` |  |  |
| 2026-05-27T08:11:25.948000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:25.946000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:20.513000-07:00 | `$scroll_depth` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` |  |  |
| 2026-05-27T08:11:17.074000-07:00 | `$scroll_depth` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` |  |  |
| 2026-05-27T08:11:15.008000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:15.004000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:11.411000-07:00 | `$scroll_depth` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` |  |  |
| 2026-05-27T08:11:10.509000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:10.497000-07:00 | `$dead_click` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:10.494000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:07.164000-07:00 | `$web_vitals` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:02.162000-07:00 | `$autocapture` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |
| 2026-05-27T08:11:02.158000-07:00 | `$dead_click` | `/chat/` | `https://unstuck.kyanitelabs.tech/chat/` | Mobile Safari | `$direct` |

## Dead-click and error-ish summary, last 30 days

- `$dead_click`: 21 events.
- `$exception`: no rows surfaced in the host-filtered error-ish query.
- `$csp_violation`: no rows surfaced in the host-filtered error-ish query.

Dead-click breakdown:

| browser | path | count |
|---|---|---:|
| Chrome | `/chat/` | 9 |
| Firefox | `/chat/` | 5 |
| Chrome iOS | `/chat/` | 3 |
| Mobile Safari | `/chat/` | 2 |
| Safari | `/chat/` | 1 |
| Chrome | `/` | 1 |

Practical read: the error-ish signal is concentrated on `/chat/`, with the dominant browsers being Chrome and Firefox, and a smaller mobile Safari slice.

## Dashboards and insights

- Dashboard `1625751` — `My App Dashboard`
  - Insight `8828406` — `Daily active users (DAUs)`
  - Insight `8828407` — `Weekly active users (WAUs)`
  - Insight `8828409` — `Growth accounting`
  - Insight `8828408` — `Retention`
  - Insight `8828410` — `Referring domain (last 14 days)`
  - Insight `8828411` — `Pageview funnel, by browser`
- Dashboard `1633430` — `AI observability default`
  - Insight `8871823` — `Traces`
  - Insight `8871824` — `Generative AI users`
  - Insight `8871825` — `Total cost (USD)`
  - Insight `8871826` — `Cost per user (USD)`
  - Insight `8871827` — `Cost by model (USD)`
  - Insight `8871828` — `Generation calls`
  - Insight `8871829` — `AI Errors`
  - Insight `8871830` — `Generation latency by model (median)`
  - Insight `8871831` — `Generations by HTTP status`

## Query notes

- `dashboards-get-all` search for `unstuck` returned `0` matches.
- `insights-list` search for `dead_click` returned `0` matches.
- `insights-list` search for `error` returned `AI Errors` (`8871829`) on dashboard `1633430`.
- SQL property access using `properties.$host`, `properties.$pathname`, `properties.$current_url`, `properties.$browser`, and `properties.$referrer` worked cleanly in this project.

## Useful read-only PostHog MCP tools confirmed available

- `execute-sql`
- `read-data-schema`
- `projects-get`
- `project-get`
- `dashboards-get-all`
- `insights-list`
- `query-trends`
- `query-paths`
- `web-analytics-weekly-digest`
- `sdk-doctor-get`
- `proxy-diagnose`
