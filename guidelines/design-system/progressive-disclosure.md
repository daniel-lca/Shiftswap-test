# Design system — Progressive Disclosure

> A practical progressive disclosure system for building focused AI prototypes. Show what users need now, reveal what they need next, and keep everything else available without making everything visible.

> **When this applies:** every prototype, at every fidelity. In lo-fi, apply the behavior and structure rules; colors, radius and icon specifics give way to `02-lofi-prototype-rules.md`.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Interfaces become harder to understand when every option, action and piece of information is visible at once.

Progressive disclosure manages complexity by revealing information and controls when they become relevant.

Core principle:

> **Show what users need now. Reveal what they need next. Keep everything else available, not visible.**

Complexity should be available on demand, not presented by default.

---

## 1. Start with the primary task

Every screen should have a clear primary purpose.

Before adding interface elements, determine:

- What is the user trying to accomplish?
- What information do they need immediately?
- What is the primary action?
- What can wait?
- What is only relevant in certain states?

Design the default screen around the primary task.

Do not give every available feature equal visual priority.

---

## 2. Essential, secondary and advanced

Classify information and actions into three levels.

### Essential

Needed to understand or complete the current task.

Keep visible.

Examples:

- Page title
- Core content
- Primary action
- Required fields
- Current status
- Important navigation

### Secondary

Useful but not necessary for most users at this moment.

Keep accessible with lower emphasis or reveal contextually.

Examples:

- Secondary actions
- Additional metadata
- Optional filters
- Supporting information

### Advanced

Needed occasionally or by experienced users.

Reveal on demand.

Examples:

- Advanced settings
- Rare configuration
- Developer options
- Detailed permissions
- Destructive administration controls

Do not hide essential information simply to make a screen look minimal.

---

## 3. Prefer sensible defaults

Good defaults reduce the amount users need to configure.

Choose a useful initial state where the product can make a reasonable assumption.

Examples:

- Common sort order
- Appropriate date range
- Recommended layout
- Standard notification setting
- Most likely option selected

Make the default visible and understandable where it matters.

Do not ask users to make decisions the product can safely make for them.

Do not silently choose high-impact or irreversible options.

---

## 4. Reveal complexity in context

Reveal controls when they become relevant.

Examples:

- Show scheduling options after `Schedule` is selected.
- Show billing address only when required.
- Show advanced filters after `More filters`.
- Show row actions when a row is selected or its action menu is opened.
- Show additional configuration after a feature is enabled.

Contextual disclosure is preferable to placing every possible option on the initial screen.

---

## 5. Use the right disclosure pattern

Choose the pattern based on the relationship between the hidden content and the current task.

### Inline reveal

Use when the additional content directly belongs to the current context.

Examples:

- `Show more`
- Additional form fields
- Expandable details

### Accordion

Use for sections users may inspect independently.

Do not put the primary task inside a collapsed accordion.

### Popover

Use for lightweight contextual choices or supporting controls.

Do not place complex workflows inside a small popover.

### Dropdown or overflow menu

Use for secondary actions.

Do not hide the primary action inside an overflow menu.

### Sheet or drawer

Use for supporting tasks that benefit from preserving the current context.

Examples:

- Filters
- Item details
- Secondary editing
- Mobile navigation

### Dialog

Use for focused decisions or short interruptive tasks.

Do not use a dialog merely to hide complexity.

### Dedicated page

Use when the task has enough depth, importance or duration to deserve its own space.

Do not force a substantial workflow into an accordion, popover or dialog.

---

## 6. Primary and secondary actions

Keep the primary action visible.

Secondary and tertiary actions can use:

- Secondary buttons
- Ghost buttons
- Text actions
- Overflow menus

A useful pattern:

```text
Primary action        Visible
Common secondary      Visible but quieter
Rare actions          Overflow
Destructive action    Separated where appropriate
```

Do not place every action in the top-level interface.

Do not hide the action users came to the page to perform.

---

## 7. Overflow menus

Overflow menus are useful for infrequent actions.

Good candidates:

- Duplicate
- Archive
- Export
- Move
- Delete
- Secondary administrative actions

Poor candidates:

- Save
- Continue
- Create
- Book
- Buy
- Other primary actions

Use Lucide `Ellipsis` for a standard overflow trigger where appropriate.

Keep menu labels explicit.

---

## 8. Advanced settings

Advanced settings should be available without dominating the default experience.

Use clear language such as:

- Advanced
- More options
- Additional settings

Do not use vague labels such as `Other`.

Keep related advanced settings grouped.

Remember the user's choices where appropriate.

Do not make expert users repeatedly reopen unnecessary disclosure layers during frequent workflows.

---

## 9. Forms

Forms benefit heavily from progressive disclosure.

Only ask for information when it becomes relevant.

Examples:

- Reveal company fields when `Business` is selected.
- Reveal delivery instructions when requested.
- Reveal advanced scheduling after scheduling is enabled.
- Reveal password requirements when the field receives focus or validation requires them.

Do not display twenty fields when the first five determine whether the remaining fifteen are relevant.

However, do not fragment a short, simple form into unnecessary steps.

---

## 10. Multi-step flows

Use multiple steps when:

- The task is genuinely sequential
- Later questions depend on earlier answers
- The total amount of information would otherwise be overwhelming
- Progress can be meaningfully communicated

Keep steps coherent.

Show progress where useful.

Allow users to go back without losing completed information.

Do not turn every form into a wizard.

A five-field form is usually better as one screen than five separate steps.

---

## 11. Details on demand

Dense product interfaces often need summary first and detail second.

Examples:

```text
List → Detail
Dashboard → Drill-down
Summary card → Full report
Notification → Related activity
Order → Order details
```

The summary should contain enough information to decide whether deeper inspection is useful.

Do not force users into a detail view for basic information that belongs in the summary.

---

## 12. Tables and lists

Keep the primary information visible.

Move secondary row actions into contextual or overflow controls.

Prioritize columns by task importance.

Additional details can appear through:

- Expandable rows
- Detail sheets
- Dedicated detail pages
- Column controls

Do not display every available data field as a table column.

Do not hide the key identifier or primary status.

---

## 13. Filters

Start with the filters most users need.

Keep advanced or less common filters behind:

- More filters
- A filter sheet
- A popover
- An expandable area

Always show that filters are active after the disclosure layer closes.

Use chips, counts or summaries where appropriate.

Do not hide applied state.

---

## 14. Navigation

Navigation is itself a form of disclosure.

Top-level navigation should expose the product's primary destinations.

Secondary destinations can live within:

- Sub-navigation
- Account menus
- Settings
- Contextual navigation

Do not expose the entire information architecture at once.

Do not bury frequently used destinations under several disclosure layers.

---

## 15. Onboarding

Reveal onboarding information at the moment it becomes useful.

Prefer:

- Contextual guidance
- Empty-state guidance
- First-use hints
- Short setup steps

Avoid front-loading a long product tour before users have context.

Do not explain every feature before the user has used the product.

---

## 16. Tooltips

Tooltips are a weak form of progressive disclosure and should only contain supplementary information.

Do not hide essential instructions or required context inside tooltips.

If users must understand something to complete the task, keep it visible.

---

## 17. Destructive actions

Destructive actions can have lower initial prominence while remaining discoverable.

For example, `Delete account` can sit within an appropriate settings section rather than beside the primary profile action.

Once initiated, clearly disclose consequences before irreversible actions.

Do not use progressive disclosure to make account cancellation or other legitimate user actions deliberately difficult to find.

---

## 18. Responsive disclosure

Smaller screens naturally require more prioritization.

A desktop interface may show:

- Persistent filters
- Secondary actions
- Supporting navigation

The mobile equivalent may use:

- Filter sheet
- Overflow menu
- Drawer
- Focused detail screen

Do not simply hide desktop content on mobile.

Preserve access to the same important tasks through an appropriate mobile pattern.

---

## 19. Avoid disclosure depth

Do not create layers inside layers.

Avoid:

```text
Page
→ Dialog
→ Accordion
→ Popover
→ Another dialog
```

Users should not have to remember several hidden contexts.

Prefer moving substantial tasks to a dedicated page rather than creating deep disclosure chains.

As a general rule, keep disclosure shallow.

---

## 20. Preserve state

When users reveal, configure or navigate through complexity, preserve their work where appropriate.

Examples:

- Keep selected filters
- Preserve form input
- Retain expanded state when useful
- Keep scroll position
- Return users to the correct context

Do not make users repeat work because a disclosure layer closed.

---

## 21. Accessibility

Disclosure controls must communicate their state.

Use semantic elements and established components.

For expandable controls, expose expanded/collapsed state appropriately.

Keyboard users must be able to:

- Reach the trigger
- Open the disclosure
- Navigate its contents
- Close it where relevant
- Return focus appropriately

Do not communicate hidden/visible state through icons alone.

---

## 22. Existing systems

Before introducing disclosure patterns, inspect the project for:

- shadcn/ui Accordion
- Collapsible
- DropdownMenu
- Popover
- Sheet
- Dialog
- Tabs
- NavigationMenu
- Existing overflow patterns
- Responsive navigation behavior

Reuse established accessible primitives.

Do not build custom disclosure behavior when the existing component system already solves it.

---

## Avoid

Avoid:

- Showing every option at once
- Hiding the primary action
- Hiding essential information
- Excessive accordions
- Dialogs used only to reduce visual complexity
- Advanced options mixed with common settings
- Deep nested disclosure
- Tooltips containing required instructions
- Long forms showing irrelevant fields
- Wizards for trivial forms
- Every table field shown as a column
- Every action shown as a button
- Mobile content simply disappearing
- Dark patterns that make legitimate actions difficult to find

---

## Final check

Before finishing a prototype, check that:

- The primary task is immediately clear.
- Essential information is visible.
- The primary action is visible.
- Secondary actions have appropriately lower emphasis.
- Rare actions are available without dominating the screen.
- Sensible defaults reduce unnecessary decisions.
- Conditional information appears only when relevant.
- Advanced settings are available on demand.
- The correct disclosure component is used for the task.
- Forms do not show irrelevant fields.
- Multi-step flows are only used when sequencing genuinely helps.
- Tables prioritize the information users need most.
- Applied filters remain visible after filter controls close.
- Mobile retains access to important functionality.
- Disclosure layers remain shallow.
- State is preserved where appropriate.
- Disclosure controls are keyboard and screen-reader accessible.
- The interface feels focused without hiding functionality users genuinely need.
