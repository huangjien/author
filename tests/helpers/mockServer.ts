import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

export function createMockServer(port = 3001) {
  const app = express();
  app.use(bodyParser.json());

  app.post('/api/suggestions', (req: Request, res: Response) => {
    const { text } = req.body as { text?: string };
    // very small deterministic mock: return one suggestion
    res.json({
      suggestions: [
        {
          id: 's-1',
          type: 'improvement',
          content: `Replace passive voice in: ${text?.slice(0, 80) ?? ''}`,
          confidence: 0.92,
          confidenceReason: 'high_keyword_match',
        },
      ],
    });
  });

  const server = app.listen(port);

  return {
    close: () =>
      new Promise<null>(resolve => {
        server.close(() => resolve(null));
      }),
    url: `http://localhost:${port}`,
  };
}
