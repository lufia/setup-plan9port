import { defineConfig } from 'oxlint'

export default defineConfig({
	ignorePatterns: ['dist/**'],
	rules: {
		'no-console': 'off',
		'typescript/array-type': 'error',
		'typescript/consistent-type-assertions': 'error',
		'typescript/explicit-function-return-type': 'error',
		'typescript/explicit-member-accessibility': [
			'error',
			{
				accessibility: 'no-public'
			}
		],
		'typescript/no-empty-interface': 'error',
		'typescript/no-extraneous-class': 'error',
		'typescript/no-inferrable-types': 'error',
		'typescript/no-namespace': 'off',
		'typescript/no-non-null-assertion': 'warn',
		'typescript/no-unnecessary-qualifier': 'error',
		'typescript/no-useless-constructor': 'error',
		'typescript/no-var-requires': 'error',
		'typescript/prefer-for-of': 'warn',
		'typescript/prefer-function-type': 'warn',
		'typescript/prefer-includes': 'error',
		'typescript/prefer-string-starts-ends-with': 'error',
		'typescript/promise-function-async': 'error',
		'typescript/require-array-sort-compare': 'error'
		// styles
		//'typescript/space-before-function-paren': 'off'
		//semi
	}
})
