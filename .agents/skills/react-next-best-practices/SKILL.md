---
name: react-next-best-practices
description: enforce react and next.js best practices for frontend development in this repository. use when chatgpt writes, reviews, refactors, debugs, or explains code in frontend/ that uses next.js 16, react 19, typescript, app router, or shared ui components. prioritize correctness, maintainability, predictable rendering, server/client boundaries, and performance. trigger on tasks involving react components, hooks, app router pages, layouts, forms, async data flows, client/server component decisions, rendering bugs, unnecessary re-renders, and frontend code review.
---

# React and Next.js Best Practices

Apply these rules whenever working in `frontend/`.

## Main Goal

Write React and Next.js code that is:

- easy for junior developers to understand
- consistent with existing app structure
- correct in server/client boundaries
- safe in hooks and state usage
- reasonably performant without premature optimization

Prefer simple and maintainable solutions over clever ones.

## Repository Context

Frontend stack:

- Next.js 16
- React 19
- TypeScript
- Biome

Use the existing structure under:

- `app/`
- `components/`
- `lib/`

Do not introduce a second formatter or linter.

## Core Frontend Principles

### 1. Prefer Server Components by Default

Unless interactivity or browser-only APIs are needed, prefer Server Components.

Use Client Components only when the code needs:

- `useState`
- `useEffect`
- browser APIs
- event handlers
- client-side subscriptions
- interactive UI state

Do not add `"use client"` unless it is necessary.

When reviewing code, question unnecessary Client Components.

### 2. Keep Client Boundaries Small

When client interactivity is needed:

- place `"use client"` as low as possible
- keep the interactive part narrow
- avoid turning an entire page or large tree into a Client Component without need

Prefer:

- server-rendered page or layout
- small interactive child component

### 3. Keep Components Small and Single-Purpose

Prefer components that do one thing well.

Split a component when it is mixing too many responsibilities, such as:

- data loading
- layout
- form logic
- display formatting
- modal state
- list rendering

Do not split components into tiny fragments without a clear readability benefit.

### 4. TypeScript First

Use explicit, readable TypeScript types.

Prefer:

- typed props
- narrow unions
- clear return types when helpful
- shared types for reused data shapes

Avoid:

- `any`
- overly broad object types
- unnecessary type complexity
- clever generics unless they clearly improve reuse or safety

When possible, derive types from existing domain models or API contracts instead of duplicating them loosely.

## Rendering and Data Flow Rules

### 5. Derive Values During Render When Possible

Do not store derived values in state unless necessary.

Prefer:

- compute from props/state during render
- memoize only when computation is expensive or referential stability matters

Avoid patterns like:

- `useEffect(() => setFiltered(...), [items])`
- `useEffect(() => setFullName(first + last), [first, last])`

Prefer plain derived expressions.

### 6. Avoid Unnecessary Effects

Treat `useEffect` as an integration tool, not a default logic tool.

Use effects for:

- subscriptions
- timers
- DOM integration
- browser APIs
- network sync caused by rendered state

Do not use effects for:

- simple derived values
- event handling logic that can stay in callbacks
- initializing state from props when derivation is enough

When reviewing code, remove effects that can be replaced by render logic or event handlers.

### 7. Keep State Minimal

Store only the minimum state needed.

Prefer storing:

- source state
- user input
- UI toggles
- async status when needed

Avoid storing:

- values that can be computed from other state
- duplicated copies of props
- multiple booleans when one state machine or enum is clearer

### 8. Prefer Controlled Simplicity in Forms

For forms:

- keep field state predictable
- validate close to the form
- use clear submit flows
- keep server/client responsibilities obvious

Do not build overly abstract form systems for simple forms.

For small forms, prefer straightforward local state or existing repo patterns over generic form infrastructure.

## Hooks Rules

### 9. Follow Hooks Rules Strictly

Never call hooks conditionally or inside loops.

Keep hooks:

- at the top level
- in a stable order
- easy to scan

If conditional logic is needed, move it inside the hook callback or split the component.

### 10. Use Memoization Sparingly

Do not add `useMemo` or `useCallback` by default.

Use them only when there is a concrete reason, such as:

- preventing expensive recalculation
- stabilizing props passed into memoized children
- stabilizing dependencies where it materially helps

Avoid defensive memoization everywhere.

Prefer readable code first.

### 11. Avoid Inline Component Definitions

Avoid defining components inside other components by default.
Allow it when the local definition clearly improves readability and is not reused.

This can:

- recreate component definitions every render
- make code harder to read
- hide reusable UI

Prefer extracting nested components to module scope or a nearby file when they are meaningful.

### 12. Name Custom Hooks Clearly

Custom hooks should:

- start with `use`
- represent one clear concern
- hide reusable logic, not just move complexity around

Prefer hooks for:

- reusable async logic
- subscriptions
- stateful UI patterns reused across components

Do not create custom hooks for one-off wrappers unless they improve clarity.

## Async and Performance Rules

### 13. Avoid Async Waterfalls

When independent async work can happen in parallel, start it in parallel.

Prefer:

- `Promise.all(...)` for independent fetches
- starting async work early and awaiting later where appropriate

Be especially careful in server-rendered code and page-level data loading.

### 14. Fetch Data in the Right Place

Choose data location intentionally:

- fetch on the server when possible
- fetch on the client only when required by interactivity, browser state, or live updates

Do not move fetches to the client without a reason.

Question patterns that cause:

- loading spinners for data that could have been server-rendered
- duplicate fetching across parent and child components
- fetches in effects when server loading is enough

### 15. Avoid Over-Sending Data to Client Components

When passing data from server to client:

- pass only what the client component needs
- avoid large nested objects
- avoid sending server-only details unnecessarily

Prefer narrow, intentional props.

### 16. Watch Re-renders Before Optimizing

When UI feels slow, first look for:

- unnecessary parent re-renders
- unstable object/array props
- too-large Client Component boundaries
- effect-driven state churn
- expensive work inside render

Only then apply memoization or restructuring.

### 17. Use Next.js Caching and Revalidation Intentionally

For server data fetching, be explicit about cache behavior.

Prefer:

- selecting cache behavior intentionally for each route/data source
- using revalidation or invalidation paths/tags when data can change
- documenting why data is static, dynamic, or periodically revalidated

Avoid:

- implicit caching assumptions
- stale UI caused by missing invalidation
- mixing incompatible cache expectations across parent/child fetches

## Component API Design

### 18. Prefer Clear Props Over Clever APIs

Component props should be easy to understand.

Prefer:

- explicit prop names
- predictable booleans
- small prop surfaces
- composable children when it improves clarity

Avoid:

- props that change meaning based on combinations
- overly generic "config" objects without a strong reason
- APIs that are hard for juniors to discover

### 19. Keep Presentational and Stateful Logic Understandable

It is fine to mix display and state in small components.

But when complexity grows, separate concerns clearly:

- presentational UI
- stateful orchestration
- data loading
- transformations

Use the simplest structure that keeps the code readable.

### 20. Reuse Existing Patterns First

Before inventing a new pattern, inspect nearby files and follow existing conventions.

Match the repo's existing approach for:

- file placement
- naming
- prop conventions
- loading and error states
- composition style

Consistency is usually more valuable than novelty.

## Next.js App Router Guidance

### 21. Use App Router Patterns Correctly

In `app/`:

- keep pages and layouts focused on route concerns
- move reusable UI into `components/`
- move shared helpers into `lib/`

Do not put unrelated business logic directly into route files if it can live in a reusable helper.

### 22. Be Explicit About Loading and Error States

For async UI, make loading and error behavior obvious.

Prefer:

- clear loading states
- clear empty states
- clear error states

Do not hide missing-state behavior.

### 23. Use Navigation and URL State Intentionally

When state belongs in the URL, keep it there.

Examples:

- search params
- filters worth sharing/bookmarking
- pagination state

Do not keep shareable route state only in local component state.

### 24. Handle Mutations Intentionally

For writes (create/update/delete), choose one clear approach per flow and keep boundaries obvious.

Prefer:

- server-first mutation flows when possible
- explicit post-mutation revalidation/invalidation strategy
- clear pending/success/error states in interactive client UI

Avoid:

- mixing multiple mutation styles in one feature without reason
- mutation logic scattered across unrelated components
- optimistic updates without rollback/error handling plan

## Review Priorities

When reviewing React/Next.js code, check in this order:

1. is the server/client boundary correct
2. are hooks used correctly
3. is state minimal and derived state avoided
4. are effects truly necessary
5. is the component readable for a junior developer
6. is async work parallelized where possible
7. are props and types clear
8. is optimization justified rather than premature

## Refactoring Priorities

When refactoring, prefer these improvements:

1. remove unnecessary `"use client"`
2. remove unnecessary `useEffect`
3. replace derived state with render-time derivation
4. narrow oversized components
5. simplify props and types
6. reduce async waterfalls
7. optimize re-renders only where evidence suggests it matters

## What to Avoid

- adding `"use client"` too high in the tree
- fetching on the client when server rendering is enough
- storing derived values in state
- using effects as general-purpose logic
- excessive `useMemo` and `useCallback`
- giant multi-purpose components
- `any`
- deeply abstracted patterns that juniors cannot follow
- introducing a new frontend architecture style without necessity

## Expected Response Style

When helping with frontend code, respond with:

1. brief diagnosis
2. minimal recommended change
3. why it is better in React/Next.js terms
4. files likely to change
5. validation command if useful

Prefer concrete repo-specific advice over generic theory.

## Validation Reminder

For frontend changes, prefer:

```bash
cd frontend && pnpm lint
cd frontend && pnpm build
```
