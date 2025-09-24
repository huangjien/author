# tasks.md

Input: /Users/huangjien/workspace/author/.specify/specs/novel-author-ai-assistant/spec.md

## Phase 3.1: Setup
- T001 Initialize TypeScript project configuration and strict mode (tsconfig.json)
- T002 [P] Install dependencies and dev dependencies (`npm install`)
- T003 Configure ESLint and Prettier, add CI lint step

## Phase 3.2: Tests First (TDD) — MUST COMPLETE BEFORE IMPLEMENTATION
- T004 [P] Contract test: POST /api/suggestions → tests/contracts/test_suggestions_contract.spec.ts
- T005 [P] Unit tests for `AIService` request/response handling → tests/unit/test_ai_service.spec.ts
- T006 [P] Unit tests for `SuggestionManager` validation/filtering → tests/unit/test_suggestion_manager.spec.ts
- T007 [P] Integration test: Suggestions panel interaction (webview) → tests/integration/test_suggestions_panel.spec.ts

## Prioritized TDD-first (detailed)

High priority (MVP + tests)

T-H1: Unit: Selection Validation
- Path: `tests/unit/test_selection_validation.spec.ts`
- Purpose: validate selection rules (REQ-005, REQ-007, REQ-008, REQ-010)

T-H2: Contract: Suggestions API
- Path: `tests/contracts/test_suggestions_contract.spec.ts`
- Purpose: contract tests for `POST /api/suggestions` against mock backend (shape, headers, error responses)

T-H3: Unit: Decoration Manager
- Path: `tests/unit/test_decoration_manager.spec.ts`
- Purpose: ensure decorations are applied/cleared per clarifications (ephemeral)

T-H4: Integration: Suggestion Request Flow
- Path: `tests/integration/test_suggestion_request_flow.spec.ts`
- Purpose: end-to-end mock-backed flow: selection → request → suggestions → preview decorations

T-H5: Webview contract tests
- Path: `tests/contracts/test_webview_suggestions_panel.spec.ts`
- Purpose: webview displays suggestions with confidence, apply/dismiss events emit activity logs

## Phase 3.3: Core Implementation
- T008 [P] Implement `src/services/AIService.ts` with mock backend support
- T009 [P] Implement `src/services/SuggestionManager.ts`
- T010 [P] Implement `src/services/DiffService.ts` for visual diff decorations
- T011 [P] Implement `src/models/WritingSession.ts` and storage APIs
- T012 Implement `src/webview/SuggestionsPanelProvider.ts`

## Phase 3.4: Integration
- T013 Connect AIService to SuggestionManager and webview
- T014 Add commands: generateSuggestions, previewChanges, applySuggestion, dismissSuggestion
- T015 Persist sessions locally and restore on activation

## Phase 3.5: Polish
- T016 [P] Unit test coverage to 80% for core modules
- T017 Performance tests for suggestion latency and memory usage
- T018 [P] Documentation: quickstart, API docs, and extension manifest updates

## Ordering and Dependencies
- Tests (T004-T007) MUST be written and failing before implementation T008-T012
- T008 blocks T009 and T010
- T011 must be implemented before T015
