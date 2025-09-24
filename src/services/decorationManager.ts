export interface Decoration {
  id: string;
  range: { start: number; end: number };
  previewText?: string;
}

export class DecorationManager {
  private decorations: Map<string, Decoration[]> = new Map();

  apply(filePath: string, decos: Decoration[]) {
    this.decorations.set(filePath, decos);
  }

  get(filePath: string): Decoration[] {
    return this.decorations.get(filePath) ?? [];
  }

  clear(filePath: string) {
    this.decorations.delete(filePath);
  }

  clearAll() {
    this.decorations.clear();
  }
}
