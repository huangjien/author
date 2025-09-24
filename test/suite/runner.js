// Lightweight runner for the VS Code extension test host.
// It registers ts-node so the test suite written in TypeScript can be required
// directly by the extension host.
try {
  require('ts-node').register({ transpileOnly: true });
} catch (e) {
  // If ts-node isn't available, fail with a helpful message.
  console.error('ts-node is required to run TypeScript-based integration tests.');
  console.error('Install it with: npm i -D ts-node');
  throw e;
}

module.exports = require('./index.ts');
