import { activate, deactivate } from '../../src/extension';
import * as vscode from 'vscode';
import { join } from 'path';
import { readFileSync, existsSync, unlinkSync } from 'fs';
import { WritingSession } from '../../src/storage/sessionStorage';

describe('Session Lifecycle', () => {
  const sessionPath = join(process.cwd(), '.author-session.json');

  beforeEach(() => {
    if (existsSync(sessionPath)) {
      unlinkSync(sessionPath);
    }
  });

  afterEach(() => {
    deactivate();
    if (existsSync(sessionPath)) {
      unlinkSync(sessionPath);
    }
  });

  it('should start, pause, resume, and end a session', async () => {
    activate({ subscriptions: [] });

    // Start session
    await vscode.commands.executeCommand('author.startSession');
    expect(existsSync(sessionPath)).toBe(true);
    let session: WritingSession = JSON.parse(readFileSync(sessionPath, 'utf-8'));
    expect(session.status).toBe('started');

    // Pause session
    await vscode.commands.executeCommand('author.pauseSession');
    session = JSON.parse(readFileSync(sessionPath, 'utf-8'));
    expect(session.status).toBe('paused');

    // Resume session
    await vscode.commands.executeCommand('author.resumeSession');
    session = JSON.parse(readFileSync(sessionPath, 'utf-8'));
    expect(session.status).toBe('started');

    // End session
    await vscode.commands.executeCommand('author.endSession');
    session = JSON.parse(readFileSync(sessionPath, 'utf-8'));
    expect(session.status).toBe('ended');
  });

  it('should export a session', async () => {
    activate({ subscriptions: [] });

    // Start session
    await vscode.commands.executeCommand('author.startSession');

    // Mock user input
    (vscode.window.showInformationMessage as jest.Mock).mockResolvedValue('Yes');
    (vscode.window.showSaveDialog as jest.Mock).mockResolvedValue({
      fsPath: join(process.cwd(), 'author-session-export.json'),
    });

    // Export session
    await vscode.commands.executeCommand('author.exportSession');

    // Verify export
    expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
      'Do you want to export the current session? This may include sensitive data.',
      'Yes',
      'No'
    );
    expect(vscode.window.showSaveDialog).toHaveBeenCalled();
    expect(existsSync(join(process.cwd(), 'author-session-export.json'))).toBe(true);

    // Clean up
    unlinkSync(join(process.cwd(), 'author-session-export.json'));
  });
});
