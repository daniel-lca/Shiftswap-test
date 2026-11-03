# Project brief

> Filled in by the AI builder after intake. Product-specific facts live here; the rules in `/guidelines` stay generic.
> Status: **CONFIRMED** <!-- NOT STARTED → CONFIRMED → IN PROGRESS → DONE -->

## Setup (Phase 1)

| Field | Answer |
|---|---|
| Category | Web app (hospital shift trade & ward manager approvals) |
| Devices & breakpoints | Nurse: Mobile-only (390px, phone frame on desktop); Manager: Desktop (1440px) |
| Fidelity | Lo-fi <!-- User specified low-fidelity wireframe regardless of PRD --> |
| Accent color | N/A (Lo-fi grayscale) |
| Dark mode | No (Light only) |
| Navigation | Mobile bottom bar / header for Nurse; Top navigation bar for Manager (assumed) |
| UI language | English (assumed) |
| Auth states | No (start logged in; auth out of scope) |

## Product (Phase 2)

- **Product name:** Shiftswap
- **Pitch:** Lets hospital nurses trade shifts with colleagues without calling the ward office, and lets ward managers approve swaps in one place.
- **Prototype purpose:** Validate with 5 nurses and 2 ward managers at St. Mary's pilot that a nurse can offer a shift and get it covered in under 1 minute, and a manager can review and approve a swap without opening another tool.
- **Audience:** St. Mary's pilot nurses (5) and ward managers (2), product team.
- **Key content per screen:** 14-day schedule (Early, Late, Night, ward, hours), eligible colleagues list (same grade, free at that time), swap detail with overtime check (48h in 7 days warning), rejection reason prompt.
- **Key interactions:** Select shift to trade, select eligible colleague, review and submit swap, view swap status, accept incoming swap, cancel offer with confirmation dialog, approve/reject swap with mandatory reason.

### User types

Each row becomes an entry in `registry.userTypes`.

| ID | Display name | What they come to do |
|---|---|---|
| `nurse` | Nurse | Rotating shifts on mobile; offers shifts and accepts swaps from colleagues |
| `ward-manager` | Ward manager | Desktop in ward office; reviews overtime risk and approves or rejects swaps |

### Flows

Each row becomes an entry in `registry.flows`. Name flows by user goal, not UI type.

| User type | Flow ID | Flow name | Purpose | Ordered screens (start screen first) |
|---|---|---|---|---|
| `nurse` | `nurse-offer-shift` | Offer a shift | Nurse offers a scheduled shift to an eligible colleague | `nurse-offer-schedule` → `nurse-offer-pick-colleague` → `nurse-offer-review-send` |
| `nurse` | `nurse-accept-swap` | Accept a swap | Nurse reviews and accepts an incoming swap request from a colleague | `nurse-accept-schedule` → `nurse-accept-request-detail` |
| `ward-manager` | `manager-approve-swap` | Approve swaps | Ward manager reviews pending shift swaps, checks overtime risk, and approves or rejects | `manager-approvals-list` → `manager-approvals-detail` |

### Directly openable states & shortcuts

Edge cases reviewers should open directly (empty, error, rejected…). They become variants or developer shortcuts.

- **No colleagues available:** Variant of `nurse-offer-pick-colleague` (`nurse-offer-pick-colleague-empty`, variant: `no-colleagues`)
- **Cancel request confirmation:** Variant of `nurse-offer-schedule` (`nurse-offer-schedule-cancel-confirm`, variant: `cancel-confirm`)
- **Overtime risk warning (48h rule):** Variant of `manager-approvals-detail` (`manager-approvals-detail-overtime-risk`, variant: `overtime-warning`)
- **No pending approvals:** Variant of `manager-approvals-list` (`manager-approvals-list-empty`, variant: `empty`)

### Product rules

Permissions, limits, approvals, required information, role-specific behavior.

- 14-day schedule view with shift types (Early: 07:00-15:30, Late: 13:30-22:00, Night: 21:30-07:30), ward, hours.
- Only colleagues with the same grade and no conflicting shift at that time can be chosen.
- A swap offer can be cancelled by the initiator until the colleague accepts; cancelling requires a confirmation modal.
- For each swap, the manager sees both nurses, shift details, and an overtime warning if the swap puts either nurse over 48 hours in a 7-day rolling window.
- Rejecting a swap requires entering a free-text reason before submission.
- Shift swap statuses: Waiting for colleague → Waiting for approval → Approved / Rejected / Cancelled.

## Scope & references (Phase 3)

- **Out of scope:** Login, push notifications, calendar sync, payroll, nurses working on more than one ward, admin settings.
- **References:** Deputy (shift view), Linear (density of the approvals list).
- **Known constraints:** Clickable prototype only; no backend; pure lo-fi wireframe (grayscale) per user instruction overriding PRD.
- **Other notes:** Brief based on user PRD "PRD: Shiftswap (MVP prototype)".

## Screen map & click paths

- `nurse-offer-schedule` (`/prototype/nurse/offer/schedule`): Tap "Trade shift" on a scheduled shift → goes to `nurse-offer-pick-colleague`.
- `nurse-offer-pick-colleague` (`/prototype/nurse/offer/pick-colleague`): Tap an eligible colleague card → goes to `nurse-offer-review-send`.
- `nurse-offer-review-send` (`/prototype/nurse/offer/review`): Tap "Send swap request" → redirects to `nurse-offer-schedule` with status badge "Waiting for colleague" and option to "Cancel request".
- `nurse-accept-schedule` (`/prototype/nurse/accept/schedule`): Shows incoming swap offer badge; tap "Review request" → goes to `nurse-accept-request-detail`.
- `nurse-accept-request-detail` (`/prototype/nurse/accept/detail`): Tap "Accept swap" → updates status to "Waiting for manager approval".
- `manager-approvals-list` (`/prototype/manager/approvals/list`): Click pending swap item in table → opens `manager-approvals-detail`.
- `manager-approvals-detail` (`/prototype/manager/approvals/detail`): Click "Approve swap" or "Reject swap" (with required note) → returns to `manager-approvals-list` updated.

## Open questions

_None — all core requirements and flows defined in PRD._

## Decisions & exceptions

- Fidelity overridden to Lo-fi (grayscale wireframe) per explicit user prompt instruction, taking precedence over PRD mention of Memorisely mid-fi.
