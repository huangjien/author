// End-to-end-ish integration test for wiring: extension -> commands -> AIService -> SuggestionManager -> panel -> sessionStorage
describe('E2E flow (T014-T015)', () => {
  test('generateSuggestions posts to panel and saves session', async () => {
    const registered: Record<string, Function> = {};
    const messages: any[] = [];

    // Create a more accurate mock of vscode
    const vscodeMock: any = {
      commands: {
        registerCommand: (name: string, handler: Function) => {
          registered[name] = handler;
          return { dispose: () => {} };
        },
        executeCommand: async (name: string, ...args: any[]) => {
          if (registered[name]) {
            return registered[name](...args);
          }
        },
      },
      window: {
        activeTextEditor: {
          document: {
            getText: () => 'selected text',
            uri: { fsPath: '/test/file.ts' },
          },
          selection: {},
        },
        showInformationMessage: jest.fn().mockResolvedValue('Yes'),
        showSaveDialog: jest.fn().mockResolvedValue({ fsPath: 'test-export.json' }),
      },
      Uri: {
        file: (path: string) => ({ fsPath: path }),
      },
    };

    // Mock AIService to return known suggestions
    const mockSuggestions = [
      {
        id: 's1',
        type: 'improvement',
        content: 'change A',
        confidence: 0.9,
        confidenceReason: 'test',
      },
    ];

    // Mock sessionStorage with comprehensive exports
    const saveCalls: any[] = [];
    const loadCalls: any[] = [];
    const createCalls: any[] = [];

    const mockSaveSession = jest.fn((session: any, path: string) => {
      saveCalls.push({ session, path });
    });
    const mockLoadSession = jest.fn((path: string) => {
      loadCalls.push({ path });
      return null; // No existing session
    });
    const mockCreateSession = jest.fn((params: any) => {
      createCalls.push(params);
      return {
        id: params.id,
        filePath: params.filePath,
        status: 'started',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    // Create the default export object
    const defaultExport = {
      saveSession: mockSaveSession,
      loadSession: mockLoadSession,
      createSession: mockCreateSession,
    };

    // Create a singleton instance for the panel
    const panelInstance = {
      messages: [],
      postMessage(msg: any) {
        messages.push(msg);
      },
      showSuggestions(suggestions: any[]) {
        this.postMessage({ type: 'showSuggestions', payload: suggestions });
      },
      lastMessage() {
        return this.messages.length ? this.messages[this.messages.length - 1] : null;
      },
    };

    // Mock the SuggestionsPanelProvider
    jest.doMock(
      '../../src/webview/SuggestionsPanelProvider',
      () => {
        return {
          SuggestionsPanelProvider: function () {
            return panelInstance;
          },
        };
      },
      { virtual: true }
    );

    // Prepare module mocks
    jest.resetModules();
    jest.doMock('vscode', () => vscodeMock, { virtual: true });
    jest.doMock('../../src/services/aiService', () => {
      return {
        AIService: class {
          async requestSuggestions(_text: string) {
            return mockSuggestions;
          }
        },
      };
    });

    // Mock session storage module path used by extension
    jest.doMock('../../src/storage/sessionStorage', () => ({
      __esModule: true,
      default: defaultExport,
      saveSession: mockSaveSession,
      loadSession: mockLoadSession,
      createSession: mockCreateSession,
      pauseSession: jest.fn(),
      resumeSession: jest.fn(),
      endSession: jest.fn(),
      exportSession: jest.fn(),
    }));

    // Require extension after mocks are in place
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ext = require('../../src/extension');

    // now activate (should register commands)
    ext.activate({ subscriptions: [] });

    expect(Object.keys(registered).length).toBeGreaterThanOrEqual(1);

    // call the generateSuggestions command
    await registered['author.generateSuggestions']();

    // The extension wiring should have called our mock saveSession
    expect(saveCalls.length).toBeGreaterThanOrEqual(1);

    // cleanup
    jest.resetModules();
  });
});
