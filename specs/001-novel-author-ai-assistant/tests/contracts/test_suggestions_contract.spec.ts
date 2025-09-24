import request from 'supertest';
import { createMockServer } from '../../../../tests/helpers/mockServer';

describe('Suggestions API contract', () => {
  let server: { close: () => Promise<null>; url: string } | null = null;

  beforeAll(() => {
    server = createMockServer(3001);
  });

  afterAll(async () => {
    if (server) await server.close();
  });

  test('POST /api/suggestions returns suggestions array with confidence', async () => {
    const res = await request(server!.url)
      .post('/api/suggestions')
      .send({ text: 'The quick brown fox jumps over the lazy dog.' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('suggestions');
    expect(Array.isArray(res.body.suggestions)).toBe(true);
    const [first] = res.body.suggestions;
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('type');
    expect(first).toHaveProperty('content');
    expect(typeof first.confidence).toBe('number');
    expect(first.confidence).toBeGreaterThanOrEqual(0);
    expect(first.confidence).toBeLessThanOrEqual(1);
  });
});
