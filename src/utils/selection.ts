export type SelectionValidationResult =
  | { valid: true; text: string; selectionLength: number }
  | { valid: false; reason: string };

/**
 * Validate a user text selection according to spec REQ-005..REQ-011 and REQ-010 limits.
 * - Accepts empty string (cursor-only) as valid for completion behavior (handled by caller)
 * - Enforces selection length between 1 and 5000 for suggestion requests
 */
export function validateSelection(input: string | null | undefined): SelectionValidationResult {
  if (input === null || input === undefined) {
    return { valid: false, reason: 'No selection provided' };
  }

  const text = String(input);
  const length = text.length;

  // Treat empty string as cursor-only (valid: caller may request a completion)
  if (length === 0) {
    return { valid: true, text, selectionLength: 0 };
  }

  if (length < 1) {
    return { valid: false, reason: 'Selection too short' };
  }

  if (length > 5000) {
    return { valid: false, reason: 'Selection exceeds maximum allowed length (5000)' };
  }

  return { valid: true, text, selectionLength: length };
}
