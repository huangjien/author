# Tasks: Novel Author AI Assistant (canonical)

**Input**: Design documents from `/specs/001-novel-author-ai-assistant/` (implementation-plan.md, data-model.md, contracts/, research.md, quickstart.md)
**Prerequisites**: See implementation-plan.md for tech stack (TypeScript, VS Code Extension API)

## Execution Flow (main)

1. Setup environment and test tooling
2. Write TDD-first tests (contract/unit/integration)
3. Implement core modules (models, services, diff/decorations)
4. Integrate webview and session tracking
5. Polish, accessibility, and performance tests

## Numbering convention: T001, T002, ...

## Phase 1: Setup

- [x] T001 Initialize feature folder and confirm plan
  - Path: `/specs/001-novel-author-ai-assistant/implementation-plan.md`
  - Action: Ensure `implementation-plan.md` exists and team agrees on milestones
- [x] T002 [P] Install project dev dependencies (local)
  - Path: `package.json`
  - Action: Run `npm ci` and verify `jest` + `ts-jest` are installed per `package.json` devDependencies
- [x] T003 [P] Configure linting/formatting and TypeScript strict mode
  - Path: `tsconfig.json`, `.eslintrc` (add if missing)
  - Action: Ensure `tsconfig.json` includes strict mode (already present)

## Phase 2: Tests First (TDD) — must be written and failing before implementation

- [x] T004 [P] Contract test: POST /api/suggestions
  - Path: `/specs/001-novel-author-ai-assistant/tests/contracts/test_suggestions_contract.spec.ts`
  - Action: Implement contract assertions for request shape and response schema (see `contracts/suggestions-contract.md`)
- [x] T005 [P] Unit test: Selection validation (REQ-005, REQ-010)
  - Path: `/tests/unit/selection.spec.ts`
  - Action: Tests already exist in `.specify/specs/novel-author-ai-assistant/tests/unit/selection.spec.ts` — copy to repo root `tests/unit/selection.spec.ts` and run failing tests
- [x] T006 [P] Unit test: Decoration manager behavior (REQ-012..REQ-018)
  - Path: `/specs/001-novel-author-ai-assistant/tests/unit/test_decoration_manager.spec.ts`
  - Action: Create tests for applying/clearing decorations and clearing on file close (ephemeral default)
- [x] T007 [P] Integration test: Suggestion request flow (mock backend)
  - Path: `/specs/001-novel-author-ai-assistant/tests/integration/test_suggestion_request_flow.spec.ts`
  - Action: End-to-end test: selection -> POST /api/suggestions -> suggestions displayed -> preview decorations applied; simulate remote failure and fallback to mock

## Phase 3: Core Implementation (only after tests exist and fail)

- [x] T008 Implement `Suggestion` model (from data-model.md)
  - Path: `src/models/suggestion.ts`
  - Action: Create TypeScript model matching `data-model.md` entity fields
- T009 Implement `WritingSession` model and storage APIs (file-scoped)
  - Path: `src/models/writingSession.ts`, `src/storage/sessionStorage.ts`
  - Action: Implement start/pause/resume/end and local JSON storage (opt-in export)
- T010 Implement `AIService` with pluggable backends (mock + remote)
  - Path: `src/services/aiService.ts`
  - Action: Provide `requestSuggestions(selection, opts)` using injected backend URL; fall back to mock on failure
- T011 Implement `SuggestionManager` to validate/filter/score suggestions
  - Path: `src/services/suggestionManager.ts`
  - Action: Honor `maxSuggestions`, `types` filter and confidence sorting
- T012 Implement `DiffService` / Decoration Manager
  - Path: `src/services/diffService.ts`, `src/services/decorationManager.ts`
  - Action: Generate and apply preview decorations; ensure cleared on file close
- T013 Implement extension commands and wiring
  - Path: `src/extension.ts`
  - Action: Commands: `generateSuggestions`, `previewChanges`, `applySuggestion`, `dismissSuggestion`

## Phase 4: Integration

- T014 [X] Wire AIService to SuggestionManager and webview
  - Path: `src/webview/SuggestionsPanelProvider.ts`, `src/services/*`
  - Action: Implemented message passing and command wiring. Artifacts: `src/commands.ts`, `src/webview/SuggestionsPanelProvider.ts`, `src/extension.ts` wiring and unit/integration tests validating generateSuggestions -> AIService -> SuggestionManager -> webview.
- T015 Persist sessions and restore on activation (in-progress)
  - Path: `src/storage/sessionStorage.ts`
  - Action: Session storage API updated (optional `suggestions` field). Extension now persists last suggestions on `generateSuggestions` to `.author-session.json`. Loading/restoring active sessions on activation and opt-in export/telemetry remain to be implemented and tested.
- T016 Integration test: Session lifecycle and export opt-in [X]
  - Path: `/specs/001-novel-author-ai-assistant/tests/integration/`
  - Action: Added integration scenarios exercising webview -> extension -> AIService flows and basic session persistence hooks. Note: full session lifecycle (start/pause/resume/end) and opt-in export flows require additional tests focused on export consent and session state transitions.

## Phase 5: Polish & Performance

- T017 [P] Accessibility and UX polish for webview and decorations
  - Path: `src/webview/*`, `src/services/decorationManager.ts`
  - Action: Keyboard navigation, color contrast checks, screen reader labels
- T018 Performance tests (synthetic latency)
  - Path: `/specs/001-novel-author-ai-assistant/tests/perf/test_latency.spec.ts`
  - Action: synthetic p95 measurements for small/large selections; collect metrics in CI
- T019 [P] Documentation: quickstart, code comments, README updates
  - Path: `/specs/001-novel-author-ai-assistant/quickstart.md`, `README.md`

## Parallel execution guidance

- Can run in parallel: T002 and T003 (setup tasks)
- Can run in parallel: T004, T005, T006, T007 (test authoring across different files) — mark [P]
- Implementation tasks per file are sequential: e.g., T008 before T011 if they share files

## Task agent commands (examples)

- Run selection unit tests:
  - `npm run test:unit -- tests/unit/selection.spec.ts`
- Run contract tests:
  - `npm run test:contract -- specs/001-novel-author-ai-assistant/tests/contracts/test_suggestions_contract.spec.ts`
- Start mock backend:
  - `node mock-backend/src/server.js`

## Dependency notes

- Tests (T004-T007) must exist and fail before implementing T008-T013
- Models (T008-T009) must exist before services (T010-T012)
- Webview wiring (T014) depends on T010-T012

## Validation checklist

- [ ] Every contract in `contracts/` has a contract test task (T004)
- [ ] All entities from `data-model.md` have model tasks (T008-T009)
- [ ] Integration tests reflect quickstart scenarios
- [ ] All paths referenced exist in the repo structure before marking tasks complete

---

Generated from `.specify` artifacts on 2025-09-24
