# quickstart.md

## Quickstart — Local development

1. Install dependencies

```bash
npm install
```

2. Build

```bash
npm run compile
```

3. Start mock backend (development)

```bash
node mock-backend/src/server.js
```

4. Run extension in VS Code (F5) — attach to extension development host

5. Run tests

```bash
npm test
```

Notes: Ensure `authorExtension.mockBackendUrl` points to `http://localhost:3001` for dev.
