# Implementation Plan — Novel Author AI Assistant (Minimal)

Goal: Deliver an MVP that provides in-editor AI suggestions, preview diffs, and basic session tracking with tests and CI gating. Follow a TDD-first workflow: write failing tests, implement minimal code to pass, then iterate.

Milestones

M1 — Foundation & Tests (1 sprint)

- Write unit tests for selection validation and decoration manager (T-H1, T-H3).
- Write contract tests for Suggestions API (T-H2) using a mock backend.
- Setup test tooling (Jest + ts-jest) and CI test job skeleton.
- Acceptance criteria:
  - Unit tests exist and run (even if placeholders) in CI
  - Contract test validates response schema from mock backend
- Estimate: 1 sprint (2 weeks)

M2 — Core MVP Implementation (1-2 sprints)

- Implement selection validation module and command handler.
- Implement AIService with pluggable backend support (mock + remote config).
- Implement SuggestionManager and wire to webview event stubs.
- Implement DiffService to display preview decorations (ephemeral behavior per clarification).
- Acceptance criteria:
  - User can request suggestions for a selection and receive mocked suggestions
  - Preview decorations appear and clear on file close
  - Tests for core modules pass in CI
- Estimate: 1-2 sprints (2-4 weeks)

M3 — Session Tracking & Export (1 sprint)

- Implement WritingSession manager (file-scoped default)
- Record typing/activity events and suggestion apply/dismiss
- Implement session export format & opt-in gating for telemetry/export
- Acceptance criteria:
  - Sessions start/stop/pause/resume and activity logged
  - Export works when user opts in and is suppressed in local mode
- Estimate: 1 sprint (2 weeks)

M4 — Integration & UX polish (1 sprint)

- Complete webview Suggestions Panel functionality with apply/dismiss flows
- Add activity log UI (collapsible sections)
- Add accessibility checks and color contrast for decorations
- Acceptance criteria:
  - Webview shows suggestions with confidence, apply/dismiss actions update editor
  - Activity log records events and is collapsible
- Estimate: 1 sprint (2 weeks)

M5 — Performance & CI Enforcement (ongoing)

- Add synthetic latency tests and CI metrics collection
- Define SLOs (TBD) and ensure fallback behavior when remote latency is high
- Acceptance criteria:
  - CI gathers p95 latency metrics from synthetic tests
  - System falls back to mock backend if remote unresponsive
- Estimate: ongoing; 1 sprint to set up basics

Implementation details & approach

- Use dependency injection for `AIService` so tests can swap in a mock backend easily.
- Keep core logic (selection validation, suggestion filtering, decoration generation) as pure functions for easy unit testing.
- Webview will communicate with extension host via message passing; design a minimal contract early.
- Store sessions locally using workspaceState/globalState or a lightweight JSON file (respecting opt-in for export/telemetry).

CI & Test infra

- Add `npm test` script running Jest; add `test:unit`, `test:integration`, `test:contract` as needed.
- CI pipeline stages: lint → unit tests → contract tests → integration (mock) tests.
- Gate merges on: lint pass, unit & contract tests pass. Integration tests can be required in a separate job once stable.

Risks and mitigations

- Remote AI latency or quota: mitigate with local mock backend and retry/backoff logic.
- UX confusion over applying edits: require explicit user action to apply (no auto-apply) and visualize changes clearly.
- Data privacy: default to suppress export/telemetry in local mode; make opt-in explicit and documented.

Deliverables at end of MVP

- Passing unit tests for selection and decoration modules
- Contract tests for suggestions API
- Working mock-backed suggestion flow with preview decorations
- Basic session tracking and export opt-in

Next actionable steps (I can do now)

1. Add minimal test tooling (Jest + ts-jest + @types/jest) and a test runner script.
2. Implement the `validateSelection` function and the first unit test to make it pass (T-H1 + A).
3. Create the suggestions API mock server harness used by contract tests.

Which next action would you like me to take? (1 / 2 / 3 from the list above, or something else.)
