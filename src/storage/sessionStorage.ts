// sessionStorage utility for CRUD operations
export function setSessionItem(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

export function getSessionItem(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function removeSessionItem(key: string): void {
  sessionStorage.removeItem(key);
}

export function clearSession(): void {
  sessionStorage.clear();
}
