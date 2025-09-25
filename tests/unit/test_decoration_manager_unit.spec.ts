import { DecorationManager } from '../../src/services/decorationManager';

describe('DecorationManager behavior (T012)', () => {
  test('apply/get/clear/clearAll', () => {
    const mgr = new DecorationManager();
    const file = 'doc.txt';
    mgr.apply(file, [{ id: 'd1', range: { start: 0, end: 3 }, previewText: 'x' }]);
    expect(mgr.get(file).length).toBe(1);
    mgr.clear(file);
    expect(mgr.get(file).length).toBe(0);
    mgr.apply('other.txt', [{ id: 'd2', range: { start: 0, end: 2 } }]);
    mgr.clearAll();
    expect(mgr.get('other.txt').length).toBe(0);
  });
});
