// WritingSession model and utilities
export interface WritingSession {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  // Add more fields as needed
}

export function saveSession(session: WritingSession) {
  const key = `session_${session.id}`;
  localStorage.setItem(key, JSON.stringify(session));
}

export function loadSession(id: string): WritingSession | null {
  const key = `session_${id}`;
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item) as WritingSession;
  } catch (e) {
    return null;
  }
}

export function deleteSession(id: string) {
  const key = `session_${id}`;
  localStorage.removeItem(key);
}

export function listAllSessions(): WritingSession[] {
  const sessions: WritingSession[] = [];
  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    if (key && key.startsWith('session_')) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          const session = JSON.parse(item) as WritingSession;
          sessions.push(session);
        } catch {}
      }
    }
  }
  return sessions;
}
