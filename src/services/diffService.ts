import { Suggestion } from '../models/suggestion';

export type DiffServiceOptions = {
  backendUrl?: string; // If undefined use mock
  timeoutMs?: number;
};

export class DiffService {
  private backendUrl?: string;
  constructor(opts: DiffServiceOptions = {}) {
    this.backendUrl = opts.backendUrl;
  }

  async getDiff(oldText: string, newText: string): Promise<Suggestion[]> {
    const url = this.backendUrl ?? 'http://localhost:3001/api/diff';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ oldText, newText }),
      });
      if (!res.ok) {
        return this.mockResponse(oldText, newText);
      }
      const body = await res.json();
      if (body && typeof body === 'object' && 'suggestions' in (body as any)) {
        return ((body as any).suggestions ?? []) as Suggestion[];
      }
      return [];
    } catch (err) {
      return this.mockResponse(oldText, newText);
    }
  }

  private mockResponse(oldText: string, newText: string): Suggestion[] {
    return [
      {
        id: 'mock-diff',
        type: 'diff',
        content: `Diff suggestion: \n- ${oldText.slice(0, 40)}\n+ ${newText.slice(0, 40)}`,
        confidence: 0.5,
      },
    ];
  }
}
