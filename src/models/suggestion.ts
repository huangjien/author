export type SuggestionType = 'improvement' | 'rewrite' | 'explain' | 'style' | 'grammar';

export interface Suggestion {
  id: string;
  type: SuggestionType;
  content: string;
  confidence: number; // 0..1
  // optional reason string explaining the confidence score (e.g. 'keyword_match')
  confidenceReason?: string;
  metadata?: Record<string, unknown>;
}

export function createSuggestion(params: {
  id: string;
  type: SuggestionType;
  content: string;
  confidence?: number;
  confidenceReason?: string;
  metadata?: Record<string, unknown>;
}): Suggestion {
  const confidence = params.confidence ?? 0.5;
  return {
    id: params.id,
    type: params.type,
    content: params.content,
    confidence: Math.max(0, Math.min(1, confidence)),
    confidenceReason: params.confidenceReason,
    metadata: params.metadata,
  };
}
