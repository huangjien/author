import { SuggestionManager } from '../../src/services/suggestionManager';
import { Suggestion } from '../../src/models/suggestion';

const suggestions: Suggestion[] = [
  { id: 's1', type: 'improvement', content: 'a', confidence: 0.9 },
  { id: 's2', type: 'rewrite', content: 'b', confidence: 0.5 },
  { id: 's3', type: 'style', content: 'c', confidence: 0.7 },
];

describe('SuggestionManager', () => {
  test('filters by minConfidence and sorts', () => {
    const mgr = new SuggestionManager();
    const out = mgr.filterAndSort(suggestions, { minConfidence: 0.6 });
    expect(out.length).toBe(2);
    expect(out[0].confidence).toBeGreaterThanOrEqual(out[1].confidence);
  });

  test('limits maxSuggestions and filters types', () => {
    const mgr = new SuggestionManager();
    const out = mgr.filterAndSort(suggestions, { maxSuggestions: 1, types: ['rewrite', 'style'] });
    expect(out.length).toBe(1);
    expect(['rewrite', 'style']).toContain(out[0].type);
  });
});
