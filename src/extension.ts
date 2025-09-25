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
import sessionStorage, {
  createSession,
  loadSession,
  WritingSession,
} from './storage/sessionStorage';
import { join } from 'path';
import { Suggestion } from './models/suggestion';
import {
  startSession,
  pauseSession,
  resumeSession,
  endSession,
  exportSession,
} from './commands/sessionCommands';

export function activate(context?: any) {
  if (!vscode) return;

  const panelProvider = new SuggestionsPanelProvider();
  const ai = new AIService();
  const mgr = new SuggestionManager();
  const sessionPath = join(process.cwd(), '.author-session.json');
  let session: WritingSession | null = loadSession(sessionPath);

  // Restore last session if available
  if (session) {
    panelProvider.showSuggestions(session.suggestions ?? []);
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('author.generateSuggestions', async () => {
      const editor = vscode.window.activeTextEditor;
      const text = editor?.document.getText(editor.selection) ?? '';
      const suggestions: Suggestion[] = await generateSuggestions(
        panelProvider as any,
        ai,
        mgr,
        text
      );

      // Persist last suggestions into session for later inspection
      try {
        const sess = session ?? createSession({ id: 'default', filePath: sessionPath });
        sess.suggestions = suggestions;
        sessionStorage.saveSession(sess, sessionPath);
        session = sess;
      } catch (e) {
        // ignore persistence errors in lightweight flow
      }
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

  // Session commands
  context.subscriptions.push(
    vscode.commands.registerCommand('author.startSession', () => {
      session = startSession(sessionPath);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('author.pauseSession', () => {
      if (session) {
        session = pauseSession(session, sessionPath);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('author.resumeSession', () => {
      if (session) {
        session = resumeSession(session, sessionPath);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('author.endSession', () => {
      if (session) {
        session = endSession(session, sessionPath);
        session = null; // Clear session after ending
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('author.exportSession', async () => {
      if (!session) {
        vscode.window.showInformationMessage('No active session to export.');
        return;
      }

      const shouldExport = await vscode.window.showInformationMessage(
        'Do you want to export the current session? This may include sensitive data.',
        'Yes',
        'No'
      );

      if (shouldExport === 'Yes') {
        const exportPath = await vscode.window.showSaveDialog({
          defaultUri: vscode.Uri.file(join(process.cwd(), 'author-session-export.json')),
        });
        if (exportPath) {
          exportSession(session, exportPath.fsPath);
          vscode.window.showInformationMessage(`Session exported to ${exportPath.fsPath}`);
        }
      }
    })
  );
}

export function deactivate() {
  // noop
}
