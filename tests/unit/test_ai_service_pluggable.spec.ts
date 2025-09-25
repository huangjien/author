import { AIService } from '../../src/services/aiService';

describe('AIService pluggable backend (T010)', () => {
  test('uses provided backendUrl when given', async () => {
    const svc = new AIService({ backendUrl: 'http://localhost:3001/api/suggestions' });
    const res = await svc.requestSuggestions('test pluggable');
    expect(Array.isArray(res)).toBe(true);
  });

  test('falls back to mock on error and includes confidenceReason from mock', async () => {
    const svc = new AIService({ backendUrl: 'http://localhost:5999' });
    const res = await svc.requestSuggestions('will fallback');
    expect(res[0]).toHaveProperty('confidenceReason');
    expect(typeof res[0].confidenceReason).toBe('string');
  });
});
