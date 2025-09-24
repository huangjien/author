import { run } from './index';

export function main() {
  run()
    .then(() => console.log('Integration tests completed'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

main();
