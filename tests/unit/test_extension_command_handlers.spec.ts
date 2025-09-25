// This test injects a fake `vscode` runtime to validate that `activate` registers commands
describe('Extension command registration and handlers (T013 stricter)', () => {
  test('activate registers commands and handlers are callable', async () => {
    // Prepare a fake vscode with commands registry
    const registered: Record<string, Function> = {};
    const vscodeMock: any = {
      commands: {
        registerCommand: (name: string, handler: Function) => {
          registered[name] = handler;
          return { dispose: () => {} };
        },
      },
      window: {
        activeTextEditor: {
          document: { getText: () => 'selected text' },
          selection: {},
        },
      },
    };

    // Use Jest to mock 'vscode' during module load so that importing
    // src/extension picks up our fake runtime.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.resetModules();
    // Provide the mock implementation for 'vscode'
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // Mark the mock as virtual because there's no real 'vscode' module installed in node_modules
    jest.doMock('vscode', () => vscodeMock, { virtual: true });

    // Now require extension and call activate (it will receive the mocked 'vscode')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ext = require('../../src/extension');
    // Call activate with a fake context
    ext.activate({ subscriptions: [] });

    // Clean up the module mock so other tests are unaffected
    jest.dontMock('vscode');
    jest.resetModules();

    // Expect commands registered
    expect(Object.keys(registered).length).toBeGreaterThanOrEqual(4);

    // Call a couple of handlers to ensure they don't throw
    await registered['author.generateSuggestions']();
    registered['author.previewSuggestion']({ id: 's1' });
    registered['author.applySuggestion']({ id: 's1' });
    registered['author.dismissSuggestion']('s1');
  });
});
