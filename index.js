// Register ts-node so the extension host can require TypeScript sources directly
try {
  require('ts-node').register({ transpileOnly: true });
} catch (e) {
  // If ts-node isn't installed, rethrow with guidance
  console.error('ts-node is required to run the extension from TypeScript source.');
  console.error('Install it with: npm i -D ts-node');
  throw e;
}

// Export activate/deactivate from the TypeScript source
module.exports = require('./src/extension.ts');
