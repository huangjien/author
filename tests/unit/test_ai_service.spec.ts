import { AIService } from '../../src/services/aiService';

describe('AIService unit tests', () => {
  test('returns suggestions from mock when backend unreachable', async () => {
    const svc = new AIService({ backendUrl: 'http://localhost:5999' }); // unreachable
    const results = await svc.requestSuggestions('Hello world');
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('id');
    expect(typeof results[0].confidence).toBe('number');
  });
});
