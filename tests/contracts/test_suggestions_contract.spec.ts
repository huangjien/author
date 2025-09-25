import request from 'supertest';
import { createMockServer } from '../../tests/helpers/mockServer';

describe('Suggestions API contract (repo tests)', () => {
  let server: { close: () => Promise<null>; url: string } | null = null;

  beforeAll(() => {
    server = createMockServer(3001);
  });

  afterAll(async () => {
    if (server) await server.close();
  });

  test('POST /api/suggestions returns suggestions array with confidence and schema (expected failure)', async () => {
    const res = await request(server!.url)
      .post('/api/suggestions')
      .send({ text: 'Testing contract failure path' })
      .set('Accept', 'application/json');

    // Basic expectations (these pass with current mock)
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('suggestions');
    expect(Array.isArray(res.body.suggestions)).toBe(true);

    // Intentionally strict assertion to force a failing contract until implementation:
    // expect each suggestion to include a `confidenceReason` string field.
    const [first] = res.body.suggestions;
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('type');
    expect(first).toHaveProperty('content');
    expect(typeof first.confidence).toBe('number');

    // NEW contract requirement not yet implemented: cause test to fail until backend includes it
    expect(typeof first.confidenceReason).toBe('string');
  });
});
