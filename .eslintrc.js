module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest'
	},
	rules: {
		indent: [
			'error',
			'tab'
		],
		"linebreak-style": [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'never'
		],
		'no-unused-vars': [
			'error',
			// we are only using this rule to check for unused arguments since TS
			// catches unused variables but not args.
			{ varsIgnorePattern: '.*', args: 'none' }
		]
	}
}
