import { writeFileSync, readFileSync, existsSync } from 'fs';
import { Suggestion } from '../models/suggestion';

export type WritingSession = {
  id: string;
  filePath: string;
  status: 'started' | 'paused' | 'ended';
  createdAt: string;
  updatedAt?: string;
  // optional last suggestions from AI
  suggestions?: Suggestion[];
};

export function createSession(params: { id: string; filePath: string }): WritingSession {
  const now = new Date().toISOString();
  return {
    id: params.id,
    filePath: params.filePath,
    status: 'started',
    createdAt: now,
    updatedAt: now,
  };
}

export function saveSession(session: WritingSession, path: string): void {
  const payload = JSON.stringify(session, null, 2);
  writeFileSync(path, payload, 'utf-8');
}

export function loadSession(path: string): WritingSession | null {
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf-8');
  return JSON.parse(raw) as WritingSession;
}

export default { createSession, saveSession, loadSession };

export function pauseSession(session: WritingSession, path: string): WritingSession {
  session.status = 'paused';
  session.updatedAt = new Date().toISOString();
  saveSession(session, path);
  return session;
}

export function resumeSession(session: WritingSession, path: string): WritingSession {
  session.status = 'started';
  session.updatedAt = new Date().toISOString();
  saveSession(session, path);
  return session;
}

export function endSession(session: WritingSession, path: string): WritingSession {
  session.status = 'ended';
  session.updatedAt = new Date().toISOString();
  saveSession(session, path);
  return session;
}

export function exportSession(session: WritingSession, exportPath: string): string {
  // write a copy to the provided export path
  const payload = JSON.stringify(session, null, 2);
  writeFileSync(exportPath, payload, 'utf-8');
  return exportPath;
}
