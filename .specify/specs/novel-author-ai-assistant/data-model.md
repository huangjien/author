# data-model.md

## Entities

### Suggestion

Fields:
- `id: string` (UUID)
- `type: 'replacement'|'completion'|'improvement'|'grammar_fix'`
- `text: string`
- `confidence: number` (0.0-1.0)
- `status: 'pending'|'applied'|'dismissed'`
- `priority: number`
- `range: { startLine, startCharacter, endLine, endCharacter }`
- `sourceSelection: TextSelection`
- `metadata: Record<string, unknown>`
- `timestamp: number`

### WritingSession

Fields:
- `id: string`
- `startTime: number`
- `endTime?: number`
- `state: 'active'|'paused'|'ended'`
- `documents: string[]` (URIs)
- `activities: WritingActivity[]`
- `statistics: SessionStatistics`
- `config: WritingSessionConfig`

### ActivityLogEntry

Fields:
- `id: string`
- `sessionId: string`
- `timestamp: number`
- `actionType: string` (e.g., 'type','suggestion-request','apply','dismiss')
- `details: Record<string, unknown>`

## Type Definitions (summary)

- `TextSelection` – includes text, range, languageId, documentUri, context snippet
- `SessionStatistics` – words, chars, activeTime, idleTime, suggestionsApplied
