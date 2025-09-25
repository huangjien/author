# Author — Novel Author AI Assistant

This repository scaffolds a VS Code extension and includes a small integration test harness for exercising the extension inside a real VS Code test instance.

## Integration tests

This project includes a small VS Code integration test harness (TypeScript tests + JS bridge files) that exercises the extension inside a real VS Code test instance. The harness downloads a local VS Code binary at runtime into `.vscode-test/` when you run it locally.

Local prerequisites

- Node.js 20+ installed
- Recommended: 8+ GB disk free (the downloaded VS Code runtime is ~200MB+)
- Install dev dependencies: run `npm ci` (this will also run `husky install` if present)
- Optional (for local dev): `npm i -D @vscode/test-electron @types/vscode` — these are usually in devDependencies already

Run tests locally

1. Install dependencies:

```bash
npm ci
```

2. Run the integration harness (this will download a VS Code test runtime into `.vscode-test/`):

```bash
# From the repo root
node ./test/suite/runTest.ts
```

Notes

- The harness activates the extension in a temporary VS Code instance and runs the integration suite (it will, for example, call `author.generateSuggestions`).
- The first run will download the VS Code runtime into `.vscode-test/`. That directory should be ignored by git (the repository's `.gitignore` should include `.vscode-test/`).
- Do not commit `.vscode-test/` — if it was accidentally committed, use a history-rewrite tool (e.g. `git filter-repo` or `git filter-branch`) to remove it and then force-push the cleaned branch.

CI guidance (recommended)

CI systems should not rely on a checked-in VS Code runtime. Two safe patterns:

1. Build-first + ephemeral download (recommended)

- Build your extension (compile TypeScript) on the CI runner before running integration tests. This avoids needing to require ts-node inside the extension host in CI.
- Let the test harness download the VS Code runtime to a CI-local path (e.g., the workspace or runner temp dir). Configure CI caching so subsequent workflow runs reuse the downloaded runtime instead of re-downloading each time.

Example GitHub Actions snippet (illustrative):

```yaml
# .github/workflows/integration.yml (snippet)
- name: Integration tests
  on: [pull_request]
  jobs:
    integration:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
        - name: Cache VS Code runtime
          uses: actions/cache@v4
          with:
            # Cache the .vscode-test folder between runs (key can include runner OS and hash)
            path: .vscode-test
            key: ${{ runner.os }}-vscode-test-${{ hashFiles('package-lock.json') }}
        - name: Install deps
          run: npm ci
        - name: Build
          run: npm run build # ensure your package.json has a build step that compiles TS
        - name: Run integration tests
          run: node ./test/suite/runTest.ts
```

2. Use a preinstalled VS Code (hosted) or container image

- Some CI environments provide preinstalled VS Code or allow you to use a container image that already includes the runtime. If available, point the test runner to that path instead of downloading into the workspace.

Additional tips

- Keep `.vscode-test/` in `.gitignore` to avoid accidental commits.
- If you prefer not to build on CI, you can keep the ts-node bridge approach, but ensure the CI runner installs `ts-node` and any runtime dependencies and that your CI workflow does not attempt to commit downloaded artifacts.
- If large files are ever committed by mistake, prefer `git filter-repo` (faster and safer) to remove them from history; after rewriting history you'll need to force-push and coordinate with collaborators.

Troubleshooting

- If the integration runner fails to download VS Code in CI because of network restrictions, consider caching the runtime as shown above or providing a prebuilt artifact in your CI infrastructure.
- After a history rewrite, local clones will need to reset to the new branch head (e.g. `git fetch origin && git reset --hard origin/001-novel-author-ai-assistant`).

If you want, I can add a small `.github/workflows/integration.yml` that implements the above snippet and a short `docs/INTEGRATION.md` with these commands and notes.
