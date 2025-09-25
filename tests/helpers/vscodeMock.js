const registeredCommands = {};

const vscode = {
  commands: {
    registerCommand: jest.fn((command, callback) => {
      registeredCommands[command] = callback;
    }),
    executeCommand: jest.fn(async (command, ...args) => {
      if (registeredCommands[command]) {
        return registeredCommands[command](...args);
      }
      console.warn(`Command '${command}' not found`);
    }),
  },
  window: {
    activeTextEditor: {
      document: {
        getText: jest.fn().mockReturnValue('some text'),
        uri: {
          fsPath: '/mock/file.ts',
        },
      },
      selection: {},
    },
    showInformationMessage: jest.fn(),
    showSaveDialog: jest.fn(),
    createWebviewPanel: jest.fn(() => ({
      webview: {
        onDidReceiveMessage: jest.fn(),
        postMessage: jest.fn(),
        asWebviewUri: jest.fn(),
      },
      onDidDispose: jest.fn(),
    })),
  },
  Uri: {
    file: jest.fn(filePath => ({
      fsPath: filePath,
    })),
  },
  ViewColumn: {
    Beside: 'Beside',
  },
  workspace: {
    getConfiguration: jest.fn(() => ({
      get: jest.fn(),
    })),
  },
};

module.exports = vscode;
