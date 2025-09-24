import { Suggestion } from '../models/suggestion';

export type SuggestionFilter = {
  maxSuggestions?: number;
  minConfidence?: number;
  types?: string[];
};

export class SuggestionManager {
  filterAndSort(suggestions: Suggestion[], opts: SuggestionFilter = {}): Suggestion[] {
    const minConfidence = opts.minConfidence ?? 0;
    const types = opts.types ?? null;

    let out = suggestions.filter(s => s.confidence >= minConfidence);
    if (types) {
      out = out.filter(s => types.includes(s.type));
    }

    out.sort((a, b) => b.confidence - a.confidence);

    if (opts.maxSuggestions && out.length > opts.maxSuggestions) {
      out = out.slice(0, opts.maxSuggestions);
    }

    return out;
  }
}
