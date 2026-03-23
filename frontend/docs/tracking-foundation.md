# Tracking foundation

This project includes a simple tracking foundation for UX Hell flow metrics.

## API

Import from `@/lib/tracking`:

- `startSession()`
- `trackClick()`
- `trackError()`
- `trackSubmitAttempt()`
- `finishSession()`
- `getPayload()`

Payload type: `TrackingPayload`.

## Client-only constraint

`@/lib/tracking` is client-only and must not be imported into:

- Server Components
- Route Handlers (`app/api/*`)
- Server Actions
- Any other server-side code

Use tracking functions only in client components (`"use client"`), then send the
payload to server endpoints as plain JSON.

`trackClick()`, `trackError()`, and `trackSubmitAttempt()` require an active
session. Always call `startSession()` first.
After `finishSession()`, `trackClick()`, `trackError()`, and
`trackSubmitAttempt()` throw an error. Start a new session with
`startSession()` before tracking again.

## Tracked fields

- `sessionId`
- `startTime` (ISO string)
- `completionTimeMs` (`number | null`)
- `clickCount`
- `errorCount`
- `submitAttempts`
- `completed`

## Usage example

```ts
import {
  finishSession,
  getPayload,
  startSession,
  trackClick,
  trackError,
  trackSubmitAttempt,
} from "@/lib/tracking";

startSession();
trackClick();
trackSubmitAttempt();
trackError();
finishSession();

const payload = getPayload();
```

## Demo page

Visit `/tracking-demo` to test all tracking actions and send the payload to `/api/tracking`.
