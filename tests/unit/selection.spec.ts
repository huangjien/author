import { validateSelection } from '../../src/utils/selection';

describe('validateSelection', () => {
  test('null or undefined selection returns invalid', () => {
    expect(validateSelection(null)).toEqual({ valid: false, reason: 'No selection provided' });
    expect(validateSelection(undefined)).toEqual({ valid: false, reason: 'No selection provided' });
  });

  test('empty selection treated as cursor-only and valid', () => {
    expect(validateSelection('')).toEqual({ valid: true, text: '', selectionLength: 0 });
  });

  test('selection length boundaries enforced', () => {
    const small = 'a';
    expect(validateSelection(small)).toEqual({ valid: true, text: 'a', selectionLength: 1 });

    const long = 'x'.repeat(5000);
    expect(validateSelection(long)).toEqual({ valid: true, text: long, selectionLength: 5000 });

    const tooLong = 'x'.repeat(5001);
    expect(validateSelection(tooLong)).toEqual({
      valid: false,
      reason: 'Selection exceeds maximum allowed length (5000)',
    });
  });
});
