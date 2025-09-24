import { run } from './index';

export function main() {
  run()
    .then(() => console.log('Integration tests completed'))
    .catch(err => {
      console.error('Integration harness encountered an error.');
      console.error(
        'Hint: This harness expects to be run with the VS Code test runner (see README).'
      );
      console.error(
        'If you are running locally, install test dependencies: `npm i -D @vscode/test-electron @types/vscode`'
      );
      console.error(err);
      process.exit(1);
    });
}

main();
