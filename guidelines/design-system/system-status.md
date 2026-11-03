# Design system — System Status

> A practical system-status framework for making AI prototypes communicate what is happening, what changed and what users should do next. Every meaningful action should receive clear, timely and proportional feedback.

> **When this applies:** every prototype, at every fidelity. In lo-fi, apply the behavior and structure rules; colors, radius and icon specifics give way to `02-lofi-prototype-rules.md`.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Users should never have to wonder:

- Did that work?
- Is this still loading?
- Was this saved?
- Why is this unavailable?
- What went wrong?
- What happens next?

The interface should continuously communicate its state.

Core principle:

> **Keep users informed about what is happening through timely, clear and appropriate feedback.**

System status is part of the interaction, not decoration added afterwards.

---

## 1. Match feedback to the action

The feedback pattern should reflect:

- Importance
- Duration
- Location
- Consequence
- Whether the user needs to act

Use the smallest feedback mechanism that communicates the state clearly.

Do not use a modal when inline feedback is enough.

Do not use a disappearing toast when the user must take action.

---

## 2. Immediate feedback

Every meaningful user action should produce immediate acknowledgement.

Examples:

- Button enters a pressed/loading state
- Checkbox changes
- Item appears in a list
- Menu closes after selection
- Save status changes
- Navigation begins
- Upload progress appears

Even when the final operation takes time, acknowledge the input immediately.

Do not leave a control visually unchanged after it has been activated.

---

## 3. Loading states

Use loading feedback when users are waiting for content or an operation.

Choose based on context.

### Button loading

Use when a specific action is processing.

```text
Save changes → Saving…
```

Include a spinner where useful.

Prevent accidental duplicate submission.

### Skeleton

Use when the structure of incoming content is predictable.

Skeletons should approximate the final layout.

Do not create elaborate skeleton interfaces unrelated to the content that appears.

### Spinner

Use for compact or indeterminate waits where content structure is not useful.

Do not cover an entire page with a spinner if existing content can remain visible.

### Progress

Use when meaningful progress can be measured.

Examples:

- Uploading
- Importing
- Processing known batches

Do not show fake precise progress.

---

## 4. Avoid loading flashes

Do not immediately show a loading indicator for operations that complete almost instantly if doing so creates visual flicker.

For very short waits, maintaining the existing interface briefly can feel more stable.

For longer waits, show status promptly.

The user should never interpret a delayed response as a broken interaction.

---

## 5. Preserve context while loading

Keep existing useful content visible where possible.

For refreshes and background updates, prefer showing a subtle updating state rather than replacing the entire interface with a blank loading screen.

Examples:

```text
Existing table remains visible + subtle refresh indicator
Current dashboard remains visible + updating status
Existing message thread remains visible + sending state
```

Do not unnecessarily remove content users are already reading.

---

## 6. Saving states

Saving should be understandable.

Useful states:

```text
Unsaved
Saving…
Saved
Save failed
```

Use only the states relevant to the product.

Autosave interfaces should make status visible without becoming distracting.

Example:

```text
Saving…
Saved
```

Do not repeatedly flash large success messages for background autosaves.

---

## 7. Success

Success feedback should be proportional.

### Small routine action

Use:

- Updated state
- Inline confirmation
- Subtle toast

### Significant completion

Use:

- Clear success state
- Summary
- Appropriate next action

Do not celebrate every routine save.

Do not interrupt the user with a dialog merely to say an ordinary action succeeded.

---

## 8. Errors

Errors should answer:

1. What happened?
2. What was affected?
3. What can the user do next?

Prefer specific language.

Good:

`We couldn't save your changes. Try again.`

Poor:

`Something went wrong.`

Use generic language only when the system genuinely cannot provide more useful information.

Preserve user work wherever possible.

---

## 9. Inline errors

Use inline errors when the issue belongs to a specific field, item or action.

Examples:

- Invalid email
- Missing required field
- Upload failed
- Payment method declined

Place the message close to the source of the problem.

Use Destructive color with text and, where useful, a Lucide status icon.

Do not rely on a red border alone.

---

## 10. Page-level errors

Use a page-level error when the entire view cannot load or the task cannot continue.

Include:

- Clear explanation
- Retry action where appropriate
- Alternative route where useful

Do not show an empty page with only `Error`.

If some content remains available, preserve it and isolate the failed area.

---

## 11. Empty states

Empty is a legitimate system state.

Differentiate between:

### First use

Nothing exists yet.

Provide context and a useful creation action.

### No results

A search returned nothing.

Reflect the query and suggest how to recover.

### Filtered empty

Existing content is hidden by current filters.

Make the active filters visible and offer a way to clear them.

### Cleared state

The user intentionally removed all items.

Confirm the state without pretending it is first use.

Do not use the same generic empty state for every scenario.

---

## 12. Offline and connection states

Where connectivity matters, communicate loss of connection and recovery.

Examples:

```text
You're offline
Changes will sync when you're back online
Connection restored
```

Do not repeatedly interrupt users with connection toasts if a persistent subtle status is more useful.

Make it clear whether work is safe.

---

## 13. Background activity

Background processes should be visible when they affect user expectations.

Examples:

- Export being prepared
- File processing
- Syncing
- AI generation
- Video processing

Allow users to continue other work when possible.

Do not force users to stare at a blocking loading screen for background work.

If they can leave safely, tell them.

---

## 14. AI status

AI-powered prototypes require particularly clear system status.

Distinguish states such as:

```text
Ready
Generating…
Streaming response
Complete
Stopped
Failed
Retrying
```

Show activity while generation is occurring.

Allow stopping or retrying where appropriate.

Do not make AI generation appear instantaneous when the user is actually waiting.

Do not imply completion before the system has finished.

---

## 15. Uploads

Uploads should communicate:

- File accepted
- Uploading
- Progress where available
- Processing if separate from upload
- Complete
- Failed
- Retry/remove actions

For multiple files, show status at file level where useful.

Do not use one ambiguous spinner for several independent uploads.

---

## 16. Destructive actions

After destructive actions, clearly communicate the result.

For reversible actions:

`Project archived` + `Undo`

can be better than requiring confirmation beforehand.

For irreversible actions, confirm before execution and then communicate completion.

Do not show `Deleted` before deletion is actually confirmed.

---

## 17. Optimistic updates

Optimistic updates can make interfaces feel immediate.

Use when failure is uncommon and recovery is straightforward.

If the request fails:

- Restore the previous state where appropriate
- Explain what happened
- Provide retry where useful

Do not silently leave the optimistic state in place after failure.

---

## 18. Toasts

Use toasts for transient, non-blocking feedback.

Good uses:

- Saved
- Copied
- Archived
- Invite sent

Poor uses:

- Required field error
- Critical account problem
- Information users need to reference later
- Complex recovery instructions

Keep toast language short.

Avoid stacking large numbers of toasts.

---

## 19. Badges and persistent status

Use badges when status needs to remain visible.

Examples:

- Draft
- Published
- Processing
- Failed
- Paid
- Overdue

Use consistent semantic color and wording.

Do not use badges for decorative metadata.

A persistent state should not rely on a temporary toast.

---

## 20. Progress indicators

Use determinate progress when actual progress is known.

Use indeterminate progress when it is not.

Do not fabricate percentages.

For long processes, provide useful context where available:

```text
Uploading 3 of 8 files
Processing video
Preparing export
```

Avoid fake precision such as `63%` when the underlying process cannot support it.

---

## 21. Time expectations

When the system can reasonably estimate duration, communicate it.

Examples:

- Usually takes less than a minute
- This may take a few minutes
- We'll email you when it's ready

Do not promise an exact completion time unless the system can support it.

For background tasks, tell users whether they can safely leave.

---

## 22. Disabled and unavailable

Unavailable actions are also system status.

If a user cannot perform an action, make the reason understandable when useful.

Examples:

`Add a payment method to continue.`

is better than an unexplained disabled button.

Do not over-explain obvious disabled states.

Do not hide an action entirely when seeing the requirement helps users understand how to proceed.

---

## 23. Status language

Use direct, human language.

Prefer:

```text
Saving…
Saved
Uploading…
Upload failed
No results
You're offline
```

Avoid:

```text
Executing operation…
Operation successful
An unexpected exception occurred
```

Use sentence case.

Keep status copy concise.

---

## 24. Icons

Use Lucide icons consistently.

Typical status icons:

- `CircleCheck` for success
- `CircleAlert` for errors
- `TriangleAlert` for warning
- `Info` for information
- `LoaderCircle` for loading where a spinner is appropriate

Do not rely on icons alone.

Follow [icons.md](icons.md) for sizing and color (Mid-fi).

---

## 25. Color

Use the semantic feedback palette from [color.md](color.md) (Mid-fi). In lo-fi, communicate status with text, shape and weight.

```text
Success       Emerald
Warning       Amber
Destructive   Red
Info          Sky
```

Color supports the message.

It does not replace text, iconography or structure.

Do not use feedback colors decoratively.

---

## 26. Motion

Use [motion.md](motion.md) to reinforce status changes (Mid-fi only).

Examples:

- Spinner rotation
- Toast entry
- Progress movement
- Subtle status transition

Do not make users wait for an animation before the state becomes understandable.

Respect reduced-motion preferences.

---

## 27. Responsive behavior

Status must remain visible and understandable on small screens.

Do not allow:

- Toasts to cover primary mobile actions
- Long errors to overflow
- Progress UI to become unreadable
- Loading overlays to trap users unnecessarily

Use inline status close to the relevant content whenever possible.

---

## 28. Accessibility

Status updates must be available beyond visual presentation.

Use appropriate live-region behavior for important asynchronous updates.

Do not announce every minor visual state change unnecessarily.

Ensure:

- Loading is understandable
- Errors are associated with relevant controls
- Focus moves appropriately after major failures where needed
- Color is never the only status indicator

Status messages should remain long enough to be understood.

---

## 29. Existing systems

Before creating new status patterns, inspect the project for:

- shadcn/ui Toast or Sonner
- Alert
- Progress
- Skeleton
- Form errors
- Existing loading components
- Existing empty states
- Existing status badges
- Existing async conventions

Reuse established patterns.

Do not create multiple unrelated loading, toast or error systems within the same product.

---

## 30. Prototype completeness

A prototype should include realistic system states, not only the ideal successful path.

For the primary flow, consider demonstrating:

- Initial state
- Loading
- Populated state
- Empty state
- Error
- Success
- Disabled/unavailable state where relevant

Do not make every state just for completeness if it cannot occur in the flow.

Prioritize the states that materially affect the experience.

---

## Avoid

Avoid:

- Actions with no immediate feedback
- Full-page spinners when existing content can remain visible
- Fake progress percentages
- Generic `Something went wrong` when useful context exists
- Red borders without error text
- Success dialogs for routine saves
- Toasts for critical information
- One generic empty state for every situation
- Disappearing status for persistent states
- Blocking users during background work unnecessarily
- Unexplained disabled controls
- Color-only status
- Decorative feedback colors
- Pretending an AI task is complete before it is
- Prototypes that demonstrate only the happy path

---

## Final check

Before finishing a prototype, check that:

- Every meaningful action receives immediate feedback.
- Users can tell when the system is loading, saving or processing.
- Existing content remains visible during background refreshes where possible.
- Success feedback is proportional to the action.
- Errors explain what happened and how to recover.
- User work is preserved after failures where possible.
- First-use, no-results and filtered empty states are distinguished.
- Background processes tell users whether they can continue or leave.
- AI generation communicates its real state.
- Uploads communicate progress and failure clearly.
- Optimistic updates recover visibly when they fail.
- Persistent statuses use persistent UI.
- Progress is genuine rather than fabricated.
- Disabled actions are explained when the reason matters.
- Status language is concise and human.
- Icons and semantic colors follow the design-system files.
- Status works across responsive layouts and both themes.
- Important asynchronous updates are accessible.
- The primary prototype flow includes the system states users are likely to encounter.
