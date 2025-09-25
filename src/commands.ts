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
  if (panel && typeof panel.postMessage === 'function') {
    panel.postMessage({ type: 'status', payload: 'requesting' });
  }
  const raw = await aiService.requestSuggestions(text);
  const suggestions = suggestionManager.filterAndSort(raw, {
    minConfidence: 0.0,
    maxSuggestions: 10,
  });
  if (panel && typeof panel.postMessage === 'function') {
    panel.postMessage({ type: 'suggestions', payload: suggestions });
  }
  return suggestions;
}

export function previewChanges(panel: SuggestionsPanelProvider, suggestion: Suggestion) {
  if (panel && typeof panel.postMessage === 'function') {
    panel.postMessage({ type: 'preview', payload: suggestion });
  }
}

export function applySuggestion(panel: SuggestionsPanelProvider, suggestion: Suggestion) {
  if (panel && typeof panel.postMessage === 'function') {
    panel.postMessage({ type: 'apply', payload: suggestion });
  }
}

export function dismissSuggestion(panel: SuggestionsPanelProvider, suggestionId: string) {
  if (panel && typeof panel.postMessage === 'function') {
    panel.postMessage({ type: 'dismiss', payload: { id: suggestionId } });
  }
}

export default { generateSuggestions, previewChanges, applySuggestion, dismissSuggestion };
