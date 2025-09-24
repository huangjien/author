<!--
Sync Impact Report

- Version change: unknown -> 1.0.0
- Modified principles:
	- (new) Code Quality (added)
	- (new) Testing Standards (added)
	- (new) User Experience Consistency (added)
	- (new) Performance & Scalability (added)
- Added sections: Development Workflow & Quality Gates, Additional Constraints (security/observability)
- Removed sections: none
- Templates requiring updates:
	- /Users/huangjien/workspace/author/.specify/templates/plan-template.md ✅ updated
	- /Users/huangjien/workspace/author/.specify/templates/spec-template.md ✅ updated
	- /Users/huangjien/workspace/author/.specify/templates/tasks-template.md ✅ updated
	- /Users/huangjien/workspace/author/.specify/templates/agent-file-template.md ⚠ pending (manual review recommended)
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): Original ratification date unknown; please set when formally adopted.
	- TODO(AGENT_FILE_SYNC): Manual sync of `agent-file-template.md` to reflect recent changes to active technologies/commands.
-->

# Author Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

All delivered code MUST follow the project's code style and quality standards. Conforming actions include:

- Automated linting and static analysis run in CI and passing before merge.
- Every PR MUST have at least one approving code review from a maintainer not on the change author list; high-risk changes (security, infra, data) REQUIRE two reviewers.
- Types, interfaces, and clear module boundaries are REQUIRED where applicable to prevent leakage of implementation details.
- Tests, docs, and in-line rationale for non-obvious code paths are REQUIRED. No TODOs left untracked in merged code.

Rationale: High code quality reduces defects, speeds onboarding, and makes maintenance predictable and low-cost.

### II. Testing Standards (NON-NEGOTIABLE)

Testing is mandatory and TDD is the default workflow for new features and bug fixes. Requirements:

- Tests MUST be written before implementation for new behavior (contract, integration, unit). Contract tests and integration tests MUST fail initially.
- CI MUST run the full test suite and block merges on failures. Test flakiness MUST be quarantined and fixed before the code is trusted.
- Coverage targets: unit test coverage SHOULD be at least 80% for business logic modules; critical modules (security, payments, core domain) MUST reach 90%+ as agreed per-module.
- Test data management: tests MUST be hermetic, idempotent, and run in CI without network access unless explicitly required and documented.

Rationale: Tests-first reduces regressions, provides executable documentation, and enables safe refactoring and continuous delivery.

### III. User Experience Consistency

User-facing behavior MUST be consistent, accessible, and predictable across the product. Requirements:

- A lightweight design system or component guidelines MUST be referenced by all UI work; visual and interaction patterns MUST be reused.
- UX acceptance criteria, including accessibility criteria (WCAG AA where applicable), MUST be recorded in specs and validated in tests or QA checklists.
- Error messages and telemetry MUST be user-focused (clear guidance + error codes) and stable to support support/observability tooling.
- Visual or functional regressions that affect primary user flows are blocking for releases until resolved.

Rationale: Consistent UX reduces user confusion, support load, and increases trust and retention.

### IV. Performance & Scalability

Performance objectives MUST be explicit for features with user-visible latency or resource footprint. Requirements:

- Every feature MUST declare performance targets in its spec (e.g., p95 latency, memory budget, throughput). If unspecified, default acceptance is p95 < 300ms for interactive APIs.
- Performance tests and benchmarks MUST be included in CI or execution runbooks for features with non-trivial targets; regressions MUST block releases.
- Resource budgets (memory, CPU, artifact size) MUST be declared and enforced where applicable.
- Load and stress test plans MUST be produced for services expected to operate at scale; results stored in the feature docs.

Rationale: Explicit performance goals prevent silent regressions and ensure predictable user experience under scale.

## Additional Constraints

- Security: All changes touching authentication, authorization, or sensitive data MUST include threat mitigation notes and at least one security-focused review.
- Observability: Services MUST emit structured logs, traces, and metrics for key business transactions; alerting thresholds for production MUST be defined.
- Compatibility: Supported platforms, browsers, and runtimes MUST be documented in feature specs when relevant.
- Dependency hygiene: Third-party dependencies with known CVEs MUST be upgraded or justified with mitigation plans.

## Development Workflow & Quality Gates

- Feature specs MUST include explicit acceptance criteria (functional, UX, performance, and security).
- The CI pipeline MUST run linting, unit tests, contract tests, integration tests, and (where applicable) performance and visual regression checks.
- Pre-merge checklist (automatable where possible):
  1.  Lint & static analysis passed
  2.  Tests (unit/integration/contract) pass in CI
  3.  Performance gates satisfied or documented exception
  4.  Accessibility/UX criteria documented and verified
  5.  Release notes and migration steps included for breaking changes

### Versioning Policy

- MAJOR: Backward-incompatible governance or principle removals/major redefinitions.
- MINOR: Addition of a new principle or materially expanded guidance.
- PATCH: Wording clarifications, typo fixes, or non-behavioral editorial changes.

Governance decisions that trigger MAJOR or MINOR bumps MUST include a migration plan and follow-up tasks to update templates and automation.

## Governance

Amendments to this constitution MUST follow the process below:

1. Create a documented proposal (PR) describing the change, rationale, and migration plan for affected artifacts (templates, CI, agents).
2. Run an initial automated Constitution Check (see templates/plan-template.md) and include results in the PR.
3. Obtain approval from a majority of repository maintainers. For MAJOR amendments, at least two maintainers MUST explicitly approve and a public discussion must be recorded.
4. On merge, update the `**Version**` line and prepend a Sync Impact Report to this file. Update affected templates and agent guidance as part of the PR.

Compliance expectations:

- All PRs MUST self-declare compliance with applicable principles via the plan and spec artifacts.
- Periodic audits (recommended quarterly) SHOULD run to detect drift; automated checks SHOULD be added to CI to enforce gates.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Original ratification date unknown - set on formal adoption | **Last Amended**: 2025-09-24
