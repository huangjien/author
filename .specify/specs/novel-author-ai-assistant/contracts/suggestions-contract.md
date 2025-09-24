# suggestions-contract.md

## Contract: POST /api/suggestions

### Request

- `selection: TextSelection` (see data-model)
- `maxSuggestions: number`
- `types: string[]` (allowed: replacement, completion, improvement, grammar_fix)

### Response (200)

- `suggestions: AISuggestion[]` where AISuggestion includes id, text, type, confidence, range

### Error (400)

- `error: string` — validation error (e.g., selection length out of bounds)

### Notes

- Contract tests MUST be generated to assert schema and failure cases.
