# research.md

Feature: Novel Author AI Assistant
Spec: /Users/huangjien/workspace/author/.specify/specs/novel-author-ai-assistant/spec.md

## Constitution Check

Performed with user explicit override: proceed without clarification. The plan MUST be
revisited after the user provides the requested Clarifications section.

- Code Quality: PASS (plan includes linting, TypeScript strict mode, and CI gates)
- Testing Standards: PASS (unit, integration, contract tests required; TDD order enforced)
- UX Consistency: PASS (webview-based Suggestions Panel, visual diff requirements captured)
- Performance & Scalability: PASS (default targets declared; feature-level perf targets TODO if
  feature impacts latency)

Remediations / TODOs:
- TODO(CLARIFICATIONS): Insert `## Clarifications` → `### Session` in the spec describing
  storage, retention, export formats, and privacy consent. This was deferred by user.

## Technical Context

- Language/Version: TypeScript 5.x
- Runtime: Node.js 20+
- Framework: VS Code Extension API
- UI: VS Code Webview UI Toolkit
- Testing: Jest (unit), VS Code extension test runner (integration)
- Mock backend: Express mock at http://localhost:3001
- Performance goals: interactive p95 < 300ms for UI interactions; suggestion generation < 5s

## Open Questions (deferred)

1. Session storage: local-only vs cloud-sync (user deferred)
2. Data retention policy (user deferred)
3. Export format preferences (user deferred)

## Research Notes

- VS Code Webview UI Toolkit supports reactive components and is suitable for Suggestions Panel.
- VS Code decoration API supports inline decorations and persists until cleared by extension state.
- For suggestion generation, use async request queuing with request deduplication to avoid duplicate
  calls while typing.

## Decisions

- Default to local-only session storage until user confirms cloud-sync.
- Enforce TypeScript strict mode and ESLint/Prettier in CI.

## Next steps

1. Produce data-model.md and contracts/ (Phase 1)
2. Generate tasks.md (Phase 2) and include TDD order
