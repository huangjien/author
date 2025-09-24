import { SuggestionsPanelProvider } from '../../src/webview/SuggestionsPanelProvider';
import { AIService } from '../../src/services/aiService';
import { SuggestionManager } from '../../src/services/suggestionManager';
import {
  generateSuggestions,
  previewChanges,
  applySuggestion,
  dismissSuggestion,
} from '../../src/commands';

describe('commands', () => {
  test('generateSuggestions posts suggestions to panel', async () => {
    const panel = new SuggestionsPanelProvider();
    const ai = new AIService({ backendUrl: 'http://localhost:9999' });
    const mgr = new SuggestionManager();

    // mock fetch to return known suggestions
    const originalFetch = (global as any).fetch;
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        suggestions: [{ id: 's1', type: 'improvement', content: 'x', confidence: 0.9 }],
      }),
    });

    const res = await generateSuggestions(panel, ai, mgr, 'text');
    expect(res.length).toBe(1);
    expect(panel.lastMessage()?.type).toBe('suggestions');

    (global as any).fetch = originalFetch;
  });

  test('preview/apply/dismiss post appropriate messages', () => {
    const panel = new SuggestionsPanelProvider();
    const suggestion = { id: 's1', type: 'explain', content: 'x', confidence: 0.4 };
    previewChanges(panel, suggestion as any);
    expect(panel.lastMessage()?.type).toBe('preview');

    applySuggestion(panel, suggestion as any);
    expect(panel.lastMessage()?.type).toBe('apply');

    dismissSuggestion(panel, 's1');
    expect(panel.lastMessage()?.type).toBe('dismiss');
  });
});
