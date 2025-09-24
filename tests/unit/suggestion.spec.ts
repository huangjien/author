import { createSuggestion } from '../../src/models/suggestion';

describe('Suggestion model', () => {
  test('createSuggestion defaults confidence and clamps values', () => {
    const s = createSuggestion({ id: 's1', type: 'improvement', content: 'Fix grammar' });
    expect(s.confidence).toBe(0.5);

    const s2 = createSuggestion({
      id: 's2',
      type: 'rewrite',
      content: 'Rewrite this',
      confidence: 1.5,
    });
    expect(s2.confidence).toBe(1);

    const s3 = createSuggestion({ id: 's3', type: 'style', content: 'Style', confidence: -0.2 });
    expect(s3.confidence).toBe(0);
  });
});
