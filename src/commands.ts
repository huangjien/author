import { AIService } from './services/aiService';
import { SuggestionManager } from './services/suggestionManager';
import { SuggestionsPanelProvider } from './webview/SuggestionsPanelProvider';
import { Suggestion } from './models/suggestion';

export async function generateSuggestions(
  panel: SuggestionsPanelProvider,
  aiService: AIService,
  suggestionManager: SuggestionManager,
  text: string
) {
  panel.postMessage({ type: 'status', payload: 'requesting' });
  const raw = await aiService.requestSuggestions(text);
  const suggestions = suggestionManager.filterAndSort(raw, {
    minConfidence: 0.0,
    maxSuggestions: 10,
  });
  panel.postMessage({ type: 'suggestions', payload: suggestions });
  return suggestions;
}

export function previewChanges(panel: SuggestionsPanelProvider, suggestion: Suggestion) {
  panel.postMessage({ type: 'preview', payload: suggestion });
}

export function applySuggestion(panel: SuggestionsPanelProvider, suggestion: Suggestion) {
  panel.postMessage({ type: 'apply', payload: suggestion });
}

export function dismissSuggestion(panel: SuggestionsPanelProvider, suggestionId: string) {
  panel.postMessage({ type: 'dismiss', payload: { id: suggestionId } });
}
