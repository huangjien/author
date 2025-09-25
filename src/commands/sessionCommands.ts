import {
  createSession,
  saveSession,
  WritingSession,
  pauseSession as pause,
  resumeSession as resume,
  endSession as end,
  exportSession as exportSess,
} from '../storage/sessionStorage';

export function startSession(sessionPath: string): WritingSession {
  const session = createSession({ id: 'default', filePath: sessionPath });
  saveSession(session, sessionPath);
  return session;
}

export function pauseSession(session: WritingSession, sessionPath: string): WritingSession {
  return pause(session, sessionPath);
}

export function resumeSession(session: WritingSession, sessionPath: string): WritingSession {
  return resume(session, sessionPath);
}

export function endSession(session: WritingSession, sessionPath: string): WritingSession {
  return end(session, sessionPath);
}

export function exportSession(session: WritingSession, exportPath: string): string {
  return exportSess(session, exportPath);
}
