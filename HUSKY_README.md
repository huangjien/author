# Husky setup

To install Husky hooks locally after checking out the repository:

1. Install dev dependencies:

   ```bash
   npm ci
   ```

2. Run Husky install (the project includes a `prepare` script so `npm ci` should run this automatically):

   ```bash
   npx husky install
   ```

3. Verify hooks exist in `.husky/` and are executable.

If you want to disable automatic `npm version` bumping on every commit, edit `.husky/pre-commit` and remove the `npm --no-git-tag-version version patch` line.
