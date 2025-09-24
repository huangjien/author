import { DecorationManager } from '../../src/services/decorationManager';

describe('DecorationManager', () => {
  test('apply and get decorations for a file', () => {
    const mgr = new DecorationManager();
    const file = '/path/to/file.ts';
    const decos = [{ id: 'd1', range: { start: 0, end: 5 }, previewText: 'replace A' }];

    mgr.apply(file, decos);
    expect(mgr.get(file)).toEqual(decos);
  });

  test('clear decorations for a file', () => {
    const mgr = new DecorationManager();
    const file = '/path/to/file2.ts';
    mgr.apply(file, [{ id: 'd2', range: { start: 0, end: 1 } }]);
    mgr.clear(file);
    expect(mgr.get(file)).toEqual([]);
  });

  test('clearAll removes all decorations', () => {
    const mgr = new DecorationManager();
    mgr.apply('/a', [{ id: 'a1', range: { start: 0, end: 1 } }]);
    mgr.apply('/b', [{ id: 'b1', range: { start: 0, end: 1 } }]);
    mgr.clearAll();
    expect(mgr.get('/a')).toEqual([]);
    expect(mgr.get('/b')).toEqual([]);
  });
});
