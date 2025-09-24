export type PanelMessage = { type: string; payload?: any };

export class SuggestionsPanelProvider {
  private messages: PanelMessage[] = [];

  postMessage(msg: PanelMessage) {
    this.messages.push(msg);
  }

  lastMessage(): PanelMessage | null {
    return this.messages.length ? this.messages[this.messages.length - 1] : null;
  }
}
