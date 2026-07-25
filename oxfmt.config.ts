import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 80,
  tabWidth: 4,
  useTabs: true,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  sortPackageJson: false,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
        useTabs: false
      }
    },
    {
      files: ['*.json', '*.config.ts'],
      options: {
        tabWidth: 2,
        useTabs: false
      }
    }
  ],
  ignorePatterns: ['*.md', 'dist/', 'lib/', 'node_modules/', '.github/**/*.yml']
})
