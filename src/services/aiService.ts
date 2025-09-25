import { Suggestion } from '../models/suggestion';

export type AIServiceOptions = {
  backendUrl?: string; // if undefined use mock
  timeoutMs?: number;
};

export class AIService {
  private backendUrl?: string;
  constructor(opts: AIServiceOptions = {}) {
    this.backendUrl = opts.backendUrl;
  }

  async requestSuggestions(text: string): Promise<Suggestion[]> {
    const url = this.backendUrl ?? 'http://localhost:3001/api/suggestions';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        return this.mockResponse(text);
      }

      const body = await res.json();
      if (body && typeof body === 'object' && 'suggestions' in (body as any)) {
        return ((body as any).suggestions ?? []) as Suggestion[];
      }
      return [];
    } catch (err) {
      // fallback to mock suggestions
      return this.mockResponse(text);
    }
  }

  private mockResponse(text: string): Suggestion[] {
    return [
      {
        id: 'mock-1',
        type: 'improvement',
        content: `Mock suggestion for: ${text.slice(0, 80)}`,
        confidence: 0.5,
        confidenceReason: 'mock_fallback',
      },
    ];
  }
}
