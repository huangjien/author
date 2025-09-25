import { writeFileSync, existsSync, readFileSync, unlinkSync } from 'fs';
import path from 'path';

describe('WritingSession model and storage (T009) - failing until implemented', () => {
  const tmpFile = path.join(__dirname, 'tmp_session.json');

  afterEach(() => {
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  });

  test('should start, pause, resume and end a session and persist to disk (expected failure)', () => {
    // Expectation: There should be an exported API at src/storage/sessionStorage.ts
    // which we haven't implemented yet; attempt to import will fail or API missing.
    const sessionStoragePath = '../../../../src/storage/sessionStorage';
    // This will throw if file doesn't exist - test is expected to fail until implemented
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const storage = require(sessionStoragePath);
    const s = storage.createSession({ id: 's1', filePath: 'doc.txt' });
    storage.saveSession(s, tmpFile);
    const disk = JSON.parse(readFileSync(tmpFile, 'utf-8'));
    expect(disk.id).toBe('s1');
  });
});
