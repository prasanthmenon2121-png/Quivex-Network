QUIVEX — Conversations Screen Visual QA Checklist

Purpose: quick manual checks to verify the Conversations screen and shell across desktop, tablet, and mobile breakpoints.

How to run locally:

1. Install deps (if needed):

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
# or to preview production build
npm run build
npm run preview
```

Breakpoints to test:

- Desktop (1366×768)
- Laptop (1280×800)
- Tablet landscape (1024×768)
- Tablet portrait (834×1112)
- Mobile (375×812)
- Small mobile (320×568)

Checks:

- [ ] Sidebar width approx 250–270px on desktop
- [ ] Sidebar uses dark surface (#101314) and is full height (100dvh)
- [ ] Logo shows (uses /logo-transparent.png) or fallback initial
- [ ] Navigation items present: Conversations, Contacts, Communities, Calls, Settings
- [ ] Active nav item shows emerald accent and subtle left border
- [ ] Hover states are subtle (no glow)
- [ ] Profile section anchored at bottom with avatar initial, name, and truncated QVX ID
- [ ] Desktop header shows "Conversations" and a "New conversation" button on the right
- [ ] Search bar visible and aligned with header content
- [ ] Empty state displays when there are no conversations (heading, subtext, CTA)
- [ ] No fake conversations are shown
- [ ] Conversation rows render real data when available (avatar, name, preview, timestamp, unread badge)
- [ ] Row hover highlight is subtle and accessible
- [ ] No horizontal overflow at any breakpoint
- [ ] Tap targets are >=48px on mobile
- [ ] No duplicate "New conversation" buttons on same screen
- [ ] Loading state shows calm skeleton rows when `loading` is true
- [ ] Error state shows retry button and calls refresh()

Notes:
- If you need to capture screenshots, use the browser devtools device toolbar or a screenshot tool and attach them to the PR.
- If any visual regressions are found, note the breakpoint and a short reproduction step.
