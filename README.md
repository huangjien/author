## Running integration tests (local)

Prerequisites:

- Node.js 20+ installed
- Run `npm ci` to install devDependencies (this will also run `husky install`)
- Install VS Code test runner deps when you plan to run integration tests: `npm i -D @vscode/test-electron @types/vscode`

To run the scaffolded integration harness:

1. Ensure dependencies are installed: `npm ci`
2. Run the harness: `node ./test/suite/runTest.ts`

The harness will activate the extension in a test instance of VS Code and execute the `author.generateSuggestions` command. Integration tests require a local VS Code test runner and cannot be executed in this sandboxed environment.
