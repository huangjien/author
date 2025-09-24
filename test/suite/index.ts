import * as path from 'path';
import * as assert from 'assert';
import * as vscode from 'vscode';

export async function run(): Promise<void> {
  // Ensure extension activates
  const ext = vscode.extensions.getExtension('huangjien.author');
  if (!ext) {
    throw new Error('Extension not found');
  }
  await ext.activate();

  // Try executing a simple command; it should not throw
  await vscode.commands.executeCommand('author.generateSuggestions');

  // If we reached here, basic activation and command wiring works
  assert.ok(true);
}
