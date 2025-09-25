import { SuggestionManager } from '../../src/services/suggestionManager';
import { Suggestion } from '../../src/models/suggestion';

describe('SuggestionManager edge cases (T011)', () => {
  test('filters by minConfidence and type and respects maxSuggestions', () => {
    const mgr = new SuggestionManager();
    const items: Suggestion[] = [
      { id: 'a', type: 'improvement', content: 'a', confidence: 0.9 },
      { id: 'b', type: 'rewrite', content: 'b', confidence: 0.8 },
      { id: 'c', type: 'improvement', content: 'c', confidence: 0.4 },
    ];

    const out = mgr.filterAndSort(items, {
      minConfidence: 0.5,
      types: ['improvement'],
      maxSuggestions: 1,
    });
    expect(out.length).toBe(1);
    expect(out[0].id).toBe('a');
  });
});
