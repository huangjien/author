describe('Extension commands wiring (T013) - expected failing placeholder', () => {
  test('commands generateSuggestions, previewChanges, applySuggestion exist (expected failure)', () => {
    // Placeholder: we expect `src/extension.ts` to export a `registerCommands` or similar API
    // that registers commands. This test will require the extension wiring to be implemented.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ext = require('../../../../src/extension');
    expect(typeof ext.activate).toBe('function');
    // next, ensure commands registered (implementation detail)
  });
});
