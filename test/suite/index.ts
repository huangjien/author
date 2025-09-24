import * as path from 'path';
import * as assert from 'assert';

// Guarded require: avoid a static `import 'vscode'` which forces TypeScript
// to resolve the module at compile time. This allows running the test
// harness in environments where `vscode` isn't installed (e.g., CI or
// local quick checks) and provides a helpful error when commands are used.
const vscode: any = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('vscode');
  } catch (err) {
    // Minimal stub to allow the harness to run; attempting to use the
    // API will surface a clear error.
    return {
      extensions: {
        getExtension: () => null,
      },
      commands: {
        executeCommand: async () => {
          throw new Error(
            'vscode module not available in this environment; run integration tests with the VS Code test runner.'
          );
        },
      },
    };
  }
})();

export async function run(): Promise<void> {
  // Ensure extension activates
  const ext = vscode.extensions.getExtension && vscode.extensions.getExtension('huangjien.author');
  if (!ext) {
    throw new Error('Extension not found');
  }
  await ext.activate();

  // Try executing a simple command; it should not throw
  await vscode.commands.executeCommand('author.generateSuggestions');

  // If we reached here, basic activation and command wiring works
  assert.ok(true);
}
