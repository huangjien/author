// Lightweight extension wiring with guarded VS Code imports so unit tests can run in Node
let vscode: any;
try {
  // Import at runtime when running inside VS Code
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  vscode = require('vscode');
} catch (e) {
  // Not running in VS Code; keep vscode undefined for tests
  vscode = undefined;
}

import { SuggestionsPanelProvider } from './webview/SuggestionsPanelProvider';
import { AIService } from './services/aiService';
import { SuggestionManager } from './services/suggestionManager';
import {
  generateSuggestions,
  previewChanges,
  applySuggestion,
  dismissSuggestion,
} from './commands';

export function activate(context?: any) {
  if (!vscode) return;

  const panelProvider = new SuggestionsPanelProvider();
  const ai = new AIService();
  const mgr = new SuggestionManager();

  context.subscriptions.push(
    vscode.commands.registerCommand('author.generateSuggestions', async () => {
      const editor = vscode.window.activeTextEditor;
      const text = editor?.document.getText(editor.selection) ?? '';
      await generateSuggestions(panelProvider as any, ai, mgr, text);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('author.previewSuggestion', (suggestion: any) => {
      previewChanges(panelProvider as any, suggestion);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('author.applySuggestion', (suggestion: any) => {
      applySuggestion(panelProvider as any, suggestion);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('author.dismissSuggestion', (id: string) => {
      dismissSuggestion(panelProvider as any, id);
    })
  );
}

export function deactivate() {
  // noop
}
