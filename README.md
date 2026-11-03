# Shiftswap prototype

Lets hospital nurses trade shifts with colleagues without calling the ward office, and lets ward managers approve swaps in one place.

- **Purpose:** Validate with 5 nurses and 2 ward managers (St. Mary's pilot) that a nurse can offer a shift and get it covered in under 1 minute, and a manager can review and approve a swap without opening another tool.
- **Fidelity:** Lo-fi
- **Devices:** Nurse: Mobile-only (390px, phone frame on desktop); Manager: Desktop (1440px)
- **Live prototype:** Add the Vercel URL after the first deploy.

## How to review

Open Prototype Home at `/`. It lists every user type, flow, and screen.
Select `Open flow` to start a journey. Use the bar at the top of each screen to move between steps.

## Where things are

| Path | Purpose |
|---|---|
| `project/BRIEF.md` | The confirmed brief: the product source of truth |
| `src/prototype/registry.ts` | Every user type, flow, screen, and route |
| `src/screens/` | One file per screen |
| `AGENTS.md`, `guidelines/` | Rules for the AI builder |

## Run locally

```bash
npm install
npm run dev
```

---

Built from the LCA prototype template.
