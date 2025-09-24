import { AIService } from '../../src/services/aiService';

describe('AIService', () => {
  test('returns mock on network error', async () => {
    const svc = new AIService({ backendUrl: 'http://localhost:9999/does-not-exist' });
    const res = await svc.requestSuggestions('hello world');
    expect(Array.isArray(res)).toBe(true);
    expect(res[0]).toHaveProperty('id');
  });

  test('parses successful response', async () => {
    // Mock global fetch
    const originalFetch = (global as any).fetch;
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        suggestions: [{ id: 's1', type: 'improvement', content: 'x', confidence: 0.9 }],
      }),
    });

    const svc = new AIService({ backendUrl: 'http://mock' });
    const res = await svc.requestSuggestions('hello');
    expect(res.length).toBe(1);

    (global as any).fetch = originalFetch;
  });
});
